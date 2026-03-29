const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    avatar: {
        type: String,
        default: 'https://ui-avatars.com/api/?name=User&background=667eea&color=fff'
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    totalPracticeTime: {
        type: Number,
        default: 0 // in minutes
    },
    streak: {
        type: Number,
        default: 0
    },
    lastPracticeDate: Date,
    favoritePoses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asana'
    }],
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOtpHash: String,
    emailVerificationOtpExpiresAt: Date,
    emailVerificationAttemptCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'yoga-secret-key-2026', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateEmailVerificationOtp = function() {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

    this.emailVerificationOtpHash = crypto
        .createHash('sha256')
        .update(otp)
        .digest('hex');
    this.emailVerificationOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    this.emailVerificationAttemptCount = 0;

    return otp;
};

userSchema.methods.matchEmailVerificationOtp = function(enteredOtp) {
    const hashedOtp = crypto
        .createHash('sha256')
        .update(enteredOtp)
        .digest('hex');

    return this.emailVerificationOtpHash === hashedOtp;
};

module.exports = mongoose.model('User', userSchema);
