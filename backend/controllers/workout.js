import {db} from "../db.js";



export const getWorkouts = (req, res) => {
  const q = "SELECT * FROM workouts WHERE uid=?";

  db.query(q, [req.user.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getWorkout = (req, res) => {
  const q = "SELECT `username`, `title`, `numExercises`, `exercises`, `date`, FROM users u JOIN workouts w ON u.id=w.uid WHERE w.id = ?"

  db.query(q, [req.params.id] = (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  })
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