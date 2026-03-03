const Asana = require('../models/Asana');

// @desc    Get all asanas
// @route   GET /api/asanas
exports.getAsanas = async (req, res) => {
    try {
        const asanas = await Asana.find();
        res.status(200).json({ success: true, count: asanas.length, data: asanas });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single asana
// @route   GET /api/asanas/:id
exports.getAsana = async (req, res) => {
    try {
        const asana = await Asana.findById(req.params.id);
        if(!asana) {
            return res.status(404).json({ success: false, error: 'Asana not found' });
        }
        res.status(200).json({ success: true, data: asana });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};