const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get single workouts
const getWorkout = async (req, res) => {
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
const createWorkout = async (req, res) => {
    const {title, numExercises, exercises} = req.body

    //add doc to db
    try {
        const workout = await Workout.create({title, numExercises, exercises})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete workout
const deleteWorkout = async (req, res) => {
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
const updateWorkout = async (req, res) => {
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
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
