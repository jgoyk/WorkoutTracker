const express = require('express')
const router = express.Router()
const Workout = require('../models/workoutModel')
const {
    createWorkout, 
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

//GET ALL workouts
router.get('/', getWorkouts)

//GET ONE workout
router.get('/:id', getWorkout)

//POST a workout
router.post('/', createWorkout)

//Delete a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router