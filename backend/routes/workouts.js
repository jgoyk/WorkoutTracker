import express from 'express';
import { addWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from '../controllers/workout.js';

const router = express.Router();

router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', addWorkout);
router.delete('/:id', deleteWorkout);
router.put('/:id', updateWorkout);


export default router;