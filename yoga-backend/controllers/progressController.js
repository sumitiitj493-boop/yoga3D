const UserProgress = require('../models/UserProgress');
const User = require('../models/User');
const Asana = require('../models/Asana');

// @desc    Get user's progress for all poses
// @route   GET /api/progress
// @access  Private
exports.getAllProgress = async (req, res) => {
    try {
        const progress = await UserProgress.find({ user: req.user.id })
            .populate('asana')
            .sort('-lastPracticed');
        
        res.status(200).json({ 
            success: true, 
            count: progress.length,
            data: progress 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get progress for specific pose
// @route   GET /api/progress/:asanaId
// @access  Private
exports.getAsanaProgress = async (req, res) => {
    try {
        const progress = await UserProgress.findOne({ 
            user: req.user.id,
            asana: req.params.asanaId 
        }).populate('asana');
        
        if (!progress) {
            return res.status(404).json({ 
                success: false, 
                error: 'No progress found for this pose' 
            });
        }
        
        res.status(200).json({ success: true, data: progress });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Record practice session
// @route   POST /api/progress/:asanaId
// @access  Private
exports.recordPractice = async (req, res) => {
    try {
        const { duration, feedback, rating } = req.body;
        const asanaId = req.params.asanaId;
        
        // Check if asana exists
        const asana = await Asana.findById(asanaId);
        if (!asana) {
            return res.status(404).json({ success: false, error: 'Asana not found' });
        }
        
        let progress = await UserProgress.findOne({
            user: req.user.id,
            asana: asanaId
        });
        
        if (progress) {
            // Update existing progress
            progress.practiceCount += 1;
            progress.totalDuration += duration || 0;
            progress.lastPracticed = Date.now();
            if (rating) progress.rating = rating;
            progress.sessions.push({
                duration: duration || 0,
                feedback: feedback || ''
            });
            
            // Auto-master after 10 practices
            if (progress.practiceCount >= 10) {
                progress.mastered = true;
            }
        } else {
            // Create new progress entry
            progress = await UserProgress.create({
                user: req.user.id,
                asana: asanaId,
                practiceCount: 1,
                totalDuration: duration || 0,
                rating,
                sessions: [{
                    duration: duration || 0,
                    feedback: feedback || ''
                }]
            });
        }
        
        await progress.save();
        
        // Update user's total practice time and streak
        const user = await User.findById(req.user.id);
        user.totalPracticeTime += Math.round((duration || 0) / 60); // Convert to minutes
        
        // Update streak
        const today = new Date().setHours(0, 0, 0, 0);
        const lastPractice = user.lastPracticeDate ? new Date(user.lastPracticeDate).setHours(0, 0, 0, 0) : null;
        
        if (!lastPractice || (today - lastPractice) / (1000 * 60 * 60 * 24) > 1) {
            user.streak = 1; // Reset streak
        } else if ((today - lastPractice) / (1000 * 60 * 60 * 24) === 1) {
            user.streak += 1; // Increment streak
        }
        
        user.lastPracticeDate = Date.now();
        await user.save();
        
        const populatedProgress = await UserProgress.findById(progress._id).populate('asana');
        
        res.status(200).json({ 
            success: true, 
            data: populatedProgress,
            userStats: {
                totalPracticeTime: user.totalPracticeTime,
                streak: user.streak
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update progress notes
// @route   PUT /api/progress/:asanaId/notes
// @access  Private
exports.updateNotes = async (req, res) => {
    try {
        const progress = await UserProgress.findOneAndUpdate(
            { user: req.user.id, asana: req.params.asanaId },
            { notes: req.body.notes },
            { new: true, runValidators: true }
        ).populate('asana');
        
        if (!progress) {
            return res.status(404).json({ success: false, error: 'Progress not found' });
        }
        
        res.status(200).json({ success: true, data: progress });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get user statistics
// @route   GET /api/progress/stats/user
// @access  Private
exports.getUserStats = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const allProgress = await UserProgress.find({ user: req.user.id });
        
        const stats = {
            totalPracticeTime: user.totalPracticeTime,
            streak: user.streak,
            totalPosesAttempted: allProgress.length,
            masteredPoses: allProgress.filter(p => p.mastered).length,
            totalSessions: allProgress.reduce((sum, p) => sum + p.practiceCount, 0),
            favoritePosesCount: user.favoritePoses.length,
            level: user.level,
            achievements: []
        };
        
        // Calculate achievements
        if (stats.totalSessions >= 1) stats.achievements.push('🌱 First Steps');
        if (stats.totalSessions >= 10) stats.achievements.push('🔥 Dedicated Yogi');
        if (stats.totalSessions >= 50) stats.achievements.push('⭐ Yoga Master');
        if (stats.streak >= 7) stats.achievements.push('📅 Week Warrior');
        if (stats.streak >= 30) stats.achievements.push('🏆 Month Champion');
        if (stats.masteredPoses >= 5) stats.achievements.push('🎯 Pose Master');
        
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};