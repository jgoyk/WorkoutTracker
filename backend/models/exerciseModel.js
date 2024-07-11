const mongoose = require('mongoose')

//function to create new schema
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    muscle: {
        type: Array, //[ Muscle1, Muscle2, ..., MuscleX ]
        required: true
    },
    image: {
        type: String, // Link to image
        required: false,
    },
    user: {
        type: String, //UserID of user that added this
        required: false,
    }
    
}, {timestamps: false})

module.exports = mongoose.model('Exercise', exerciseSchema)