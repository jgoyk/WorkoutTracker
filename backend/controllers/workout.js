import {db} from "../db.js";


export const getWorkouts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM workouts WHERE cat=?" :  "SELECT * FROM workouts"

    db.query(q,[req.query.cat], (err, data)=> {
        if (err) return res.json(err);
        
        return res.status(200).json(data);
    })
}
export const getWorkout = (req, res) => {
    res.json("from controller")
}
export const addWorkout = (req, res) => {
    res.json("from controller")
}
export const deleteWorkout = (req, res) => {
    res.json("from controller")
}
export const updateWorkout = (req, res) => {
    res.json("from controller")
}