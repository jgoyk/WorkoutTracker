import express from 'express';
import { addWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from '../controllers/workout.js';
import { authenticateToken } from '../middleware/authenticateToken.js'; 

const router = express.Router();

router.get('/', authenticateToken, getWorkouts);
router.get('/:id', authenticateToken, getWorkout);
router.post('/', authenticateToken, addWorkout);
router.delete('/:id', authenticateToken, deleteWorkout);
router.put('/:id', authenticateToken, updateWorkout);

export default router;