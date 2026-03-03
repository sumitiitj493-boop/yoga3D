const mongoose = require('mongoose');

const asanaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sanskritName: String,
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    description: String,
    benefits: [String],
    imageUrl: String,
    // 🌟 3D Model URL for the viewer
    modelUrl: {
        type: String, 
        default: '' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Asana', asanaSchema);