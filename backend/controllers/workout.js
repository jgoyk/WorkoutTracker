import {db} from "../db.js";



export const getWorkouts = (req, res) => {
  const q = "SELECT * FROM workouts WHERE uid=?";

  db.query(q, [req.user.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getWorkout = (req, res) => {
  const q = "SELECT `username`, `title`, `numexercises`, `exercises`, `date` FROM users u JOIN workouts w ON u.id=w.uid WHERE w.id = ?"

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(`error: ${err}`);
    return res.status(200).json(data[0]);
  })
}
export const addWorkout = (req, res) => {
    const q = "INSERT INTO workouts(`title`, `numexercises`, `exercises`, `uid`, `date`) VALUES (?)"


    const values = [
        req.body[0],
        req.body[1],
        JSON.stringify(req.body[2]),
        req.user.id,
        req.body[3] 
    ]
    
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    })
}
export const deleteWorkout = (req, res) => {
    
    const q = "DELETE FROM workouts WHERE `id`=? AND `uid`=?"

    db.query(q, [req.params.id, req.user.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    })
}
export const updateWorkout = (req, res) => {

  const workoutId = req.params.id !== undefined ? req.body[4] : req.params.id;
  const q = "UPDATE workouts SET `title` = ?, `numexercises` = ?, `exercises` = ?, `date` = ? WHERE `id` = ? AND `uid` = ?";
  const values = [req.body[0], req.body[1], JSON.stringify(req.body[2]), req.body[3], workoutId, req.user.id];
  db.query(q, [...values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}