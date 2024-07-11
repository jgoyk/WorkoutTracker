const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')
//get all workouts
const getExercises = async (req, res) => {
    const exercises = await Exercise.find({}).sort({createdAt: -1})
    res.status(200).json(exercises)
}

//get single workouts
const getExercise = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid ID'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
    }


//create new workout
const createExercise = async (req, res) => {
    const {name, muscle, exercise1, user} = req.body

    //add doc to db
    try {
        const exercise = await Exercise.create({name, muscle, exercise1, user})
        res.status(200).json(exercise)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete workout
const deleteExercise = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid ID'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    //add doc to db
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
}

//update Workout
const updateExercise = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid ID'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    //add doc to db
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
}



module.exports = {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
}
