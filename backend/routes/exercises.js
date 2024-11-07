import express from 'express';
import { getExercises, getExercise } from '../controllers/exercise.js';

const router = express.Router();

router.get('/', getExercises);
router.get('/:id', getExercise);

export default router;