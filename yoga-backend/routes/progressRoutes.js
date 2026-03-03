const express = require('express');
const router = express.Router();
const { 
    getAllProgress,
    getAsanaProgress,
    recordPractice,
    updateNotes,
    getUserStats
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

/**
 * @swagger
 * /api/progress:
 *   get:
 *     summary: Get all user progress
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User progress for all poses
 */
router.get('/', getAllProgress);

/**
 * @swagger
 * /api/progress/stats/user:
 *   get:
 *     summary: Get user statistics
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics and achievements
 */
router.get('/stats/user', getUserStats);

/**
 * @swagger
 * /api/progress/{asanaId}:
 *   get:
 *     summary: Get progress for specific pose
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: asanaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress for specific pose
 */
router.get('/:asanaId', getAsanaProgress);

/**
 * @swagger
 * /api/progress/{asanaId}:
 *   post:
 *     summary: Record practice session
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: asanaId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration:
 *                 type: number
 *               feedback:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Practice session recorded
 */
router.post('/:asanaId', recordPractice);

/**
 * @swagger
 * /api/progress/{asanaId}/notes:
 *   put:
 *     summary: Update practice notes
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: asanaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notes updated successfully
 */
router.put('/:asanaId/notes', updateNotes);

module.exports = router;