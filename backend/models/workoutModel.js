const mongoose = require('mongoose')

//function to create new schema
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    numExercises: {
        type: Number,
        required: true
    },
    exercises: {
        type: Array, // [ [ Name, NumberOfSets, [ {Set1, Weight1}, ... , {SetX, WeightX} ] ]
        required: true,
    },
    date: {
        type: Date, 
        required: false,
    }, 
    user: {
        type: String, //UserID of user who's workout this is
        required: false,
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)