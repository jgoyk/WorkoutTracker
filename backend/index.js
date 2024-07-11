require('dotenv').config()
const cors = require('cors');  
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require("./routes/workouts.js")
const exerciseRoutes = require("./routes/exercises.js")



//app is an express app
const app = express()

//use cors
app.use(cors());

//middleware that checks for request body
app.use(express.json())

//middleware
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/exercises', exerciseRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //app starts listening for requests on port 4000n
        app.listen(process.env.PORT, ()=>{
            console.log("Connected to DB & Listening on port " + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })





