const express = require('express')
const router = express.Router()
const Exercise = require('../models/exerciseModel')
const {
    createExercise, 
    getExercise,
    getExercises,
    deleteExercise,
    updateExercise
} = require('../controllers/exerciseController')

//GET ALL workouts
router.get('/', getExercises)

//GET ONE workout
router.get('/:id', getExercise)

//POST a workout
router.post('/', createExercise)

//Delete a workout
router.delete('/:id', deleteExercise)

//UPDATE a workout
router.patch('/:id', updateExercise)

module.exports = router