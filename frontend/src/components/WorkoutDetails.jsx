import axios from "axios";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import WorkoutUpdateForm from "./WorkoutUpdateForm";


const WorkoutDetails = ({ workout, currentUser, currentToken, onDeleteWorkout, onEditWorkout }) => {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (workoutId) => {
    try {
      if (!currentToken) {
        console.log("No token found, user might not be authenticated");
        alert("Please sign in");
        return;
      }

      const res = await axios.delete(
        `${import.meta.env.VITE_DB_URL}/workouts/${workoutId}`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      onDeleteWorkout(workoutId);
      navigate("/")
      
    } catch (err) {
      console.error("Error fetching workouts:", err);
    }
  }
  const handleEdit = async (workoutId) => {
    setEditing(true);

  }
  
  return (
      <div key={workout.id} className="p-2 ">
        {editing && <WorkoutUpdateForm workout={workout} onEditWorkout={onEditWorkout} currentUser={currentUser} currentToken={currentToken} setEditing={setEditing}/>}
        <table className="table-auto border border-slate-500">
          <thead className="border border-slate-500">
            <tr>
              <th colSpan="3" className="text-center">
                <Link to={`/workout/${workout.id}`}>
                  {workout.title ? workout.title : "Workout"}
                </Link>
              </th>
            </tr>
            <tr className="flex flex-row justify-around px-2">
              <th colSpan="1" className="font-semibold italic">{workout.date ? `${new Date(workout.date).getUTCMonth()+1}/${new Date(workout.date).getUTCDate()}/${new Date(workout.date).getUTCFullYear()}` : "No Date"}</th>
              <th className="flex flex-row">
                <HiOutlineTrash className="h-6 w-6 cursor-pointer" onClick={() => handleDelete(workout.id)}/>
                <HiOutlinePencilAlt className="h-6 w-6 cursor-pointer" onClick={() => handleEdit(workout.id)} />
              </th>
            </tr>
            
          </thead>
          <tbody >
            {workout.exercises.exercises.map((item, index) => (
              <tr key={index}>
                <td colSpan="3">
                  <div className="border border-gray-400 m-2 p-2">
                    
                    <table className="w-full">
                      <thead>
    
                        <tr>
                          <th colSpan="3" className="text-center">Exercise {index + 1}: {item[0]}</th>
                        </tr>
                        <tr>
                          <td className="text-center">Set</td>
                          <td className="text-center">Weight</td>
                          <td className="text-center">Reps</td>
                        </tr>
                      </thead>
                      <tbody>
                        {item[2].map((set, setIndex) => (
                          <tr key={setIndex}>
                            <td className="text-center">{setIndex + 1}</td>
                            <td className="text-center">{set[0]}</td>
                            <td className="text-center">{set[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        </table>
      </div>
  )
}
export default WorkoutDetails