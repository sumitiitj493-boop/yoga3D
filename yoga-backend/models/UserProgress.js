const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    asana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asana',
        required: true
    },
    practiceCount: {
        type: Number,
        default: 0
    },
    totalDuration: {
        type: Number,
        default: 0 // in seconds
    },
    lastPracticed: {
        type: Date,
        default: Date.now
    },
    mastered: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    notes: String,
    sessions: [{
        duration: Number, // in seconds
        date: {
            type: Date,
            default: Date.now
        },
        feedback: String
    }]
}, {
    timestamps: true
});

// Create compound index for unique user-asana combination
userProgressSchema.index({ user: 1, asana: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);