const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const { sendVerificationEmail } = require('../utils/sendEmail');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, level } = req.body;
        const normalizedEmail = email?.toLowerCase().trim();

        if (!name || !normalizedEmail || !password) {
            return res.status(400).json({ success: false, error: 'Please provide name, email and password' });
        }

        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return res.status(500).json({ success: false, error: 'Email service is not configured' });
        }

        let user = await User.findOne({ email: normalizedEmail }).select('+password');
        let isNewUser = false;

        if (user && user.isEmailVerified) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }

        if (!user) {
            user = new User({
                name,
                email: normalizedEmail,
                password,
                level,
                isEmailVerified: false,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff`
            });
            isNewUser = true;
        } else {
            user.name = name;
            user.email = normalizedEmail;
            user.password = password;
            user.level = level;
            user.isEmailVerified = false;
            user.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff`;
        }

        const otp = user.generateEmailVerificationOtp();
        await user.save();

        try {
            await sendVerificationEmail({ email: normalizedEmail, name, otp });
        } catch (mailError) {
            if (isNewUser) {
                await User.findByIdAndDelete(user._id);
            }
            return res.status(500).json({ success: false, error: 'Could not send verification email' });
        }

        res.status(201).json({
            success: true,
            requiresVerification: true,
            email: normalizedEmail,
            message: 'Verification OTP sent to your email'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        if (user.isEmailVerified === false) {
            return res.status(403).json({
                success: false,
                error: 'Please verify your email before logging in',
                code: 'EMAIL_NOT_VERIFIED'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Verify email OTP
// @route   POST /api/auth/verify-email-otp
// @access  Public
exports.verifyEmailOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const normalizedEmail = email?.toLowerCase().trim();

        if (!normalizedEmail || !otp) {
            return res.status(400).json({ success: false, error: 'Please provide email and OTP' });
        }

        const user = await User.findOne({ email: normalizedEmail }).select('+password');

        if (!user || user.isEmailVerified) {
            return res.status(400).json({ success: false, error: 'Invalid verification request' });
        }

        if (!user.emailVerificationOtpHash || !user.emailVerificationOtpExpiresAt) {
            return res.status(400).json({ success: false, error: 'No active OTP found for this account' });
        }

        if (user.emailVerificationOtpExpiresAt < new Date()) {
            user.emailVerificationOtpHash = undefined;
            user.emailVerificationOtpExpiresAt = undefined;
            user.emailVerificationAttemptCount = 0;
            await user.save();
            return res.status(400).json({ success: false, error: 'OTP has expired. Please register again to get a new one.' });
        }

        if (!user.matchEmailVerificationOtp(otp)) {
            user.emailVerificationAttemptCount = (user.emailVerificationAttemptCount || 0) + 1;

            if (user.emailVerificationAttemptCount >= 5) {
                user.emailVerificationOtpHash = undefined;
                user.emailVerificationOtpExpiresAt = undefined;
                user.emailVerificationAttemptCount = 0;
                await user.save();
                return res.status(400).json({ success: false, error: 'Too many invalid attempts. Please register again to get a new OTP.' });
            }

            await user.save();
            return res.status(400).json({ success: false, error: 'Invalid OTP' });
        }

        user.isEmailVerified = true;
        user.emailVerificationOtpHash = undefined;
        user.emailVerificationOtpExpiresAt = undefined;
        user.emailVerificationAttemptCount = 0;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('favoritePoses');
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email,
            level: req.body.level
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Add/Remove favorite pose
// @route   POST /api/auth/favorites/:asanaId
// @access  Private
exports.toggleFavorite = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const asanaId = req.params.asanaId;

        const index = user.favoritePoses.indexOf(asanaId);
        if (index > -1) {
            user.favoritePoses.splice(index, 1);
        } else {
            user.favoritePoses.push(asanaId);
        }

        await user.save();
        const updatedUser = await User.findById(req.user.id).populate('favoritePoses');

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Helper to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                level: user.level,
                avatar: user.avatar,
                totalPracticeTime: user.totalPracticeTime,
                streak: user.streak
            }
        });
};
