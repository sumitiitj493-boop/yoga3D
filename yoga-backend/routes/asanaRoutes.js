const express = require('express');
const router = express.Router();
const { getAsanas, getAsana } = require('../controllers/asanaController');

/**
 * @swagger
 * /api/asanas:
 *   get:
 *     summary: Get all yoga poses
 *     description: Retrieve a list of all yoga asanas from the database
 *     responses:
 *       200:
 *         description: A list of asanas
 */
router.route('/').get(getAsanas);

/**
 * @swagger
 * /api/asanas/{id}:
 *   get:
 *     summary: Get a single yoga pose
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the asana to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single asana object
 *       404:
 *         description: Asana not found
 */
router.route('/:id').get(getAsana);

module.exports = router;