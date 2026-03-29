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
    // 🌟 3D Model URL - can be GLB file path or Sketchfab embed URL
    modelUrl: {
        type: String, 
        default: '' 
    },
    // 🌟 Type of 3D model
    modelType: {
        type: String,
        enum: ['glb', 'sketchfab', 'gif', 'procedural'],
        default: 'procedural'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Asana', asanaSchema);
