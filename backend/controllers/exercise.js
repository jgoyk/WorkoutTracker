import {db} from "../db.js";


export const getExercises = (req, res) => {
  const q = "SELECT * FROM exercises";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getExercise = (req, res) => {
  const q = "SELECT * FROM exercises WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(`error: ${err}`);
    return res.status(200).json(data[0]);
  })
}