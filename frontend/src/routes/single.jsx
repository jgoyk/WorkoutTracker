import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { HiOutlineTrash } from "react-icons/hi";

function Single() {
  const [workout, setWorkout] = useState([]);
  const { currentUser, currentToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const workoutId = location.pathname.split("/")[2];

  const handleDelete = async () => {
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
      console.log(res);
      navigate("/")
      
    } catch (err) {
      console.error("Error fetching workouts:", err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!currentToken) {
          console.log("No token found, user might not be authenticated");
          alert("Please sign in");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_DB_URL}/workouts/${workoutId}`,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          }
        );
        console.log(workout)
        console.log("hello")
        setWorkout(res.data);
        
      } catch (err) {
        console.error("Error fetching workouts:", err);
      }
    };

    if (currentUser && currentToken) {
      fetchData();
    }
  }, [currentUser, currentToken]);


  return (
    <div className="w-full h-full flex flex-col ">
      <div className="text-xl font-semibold p-2 m-4 text-center">
        Single Workouts
      </div>
      {workout && (
        <div className="w-full flex flex-row justify-center">
          <table className="table-auto border border-slate-500 max-w-lg ">
            <thead className="border border-slate-500">
              <tr className="flex flex-row justify-around p-2">
                <th colSpan="1">{workout.title ? workout.title : "Workout"}</th>
                <th colSpan="1" className="font-semibold italic">
                  {workout.date
                    ? `${new Date(workout.date).getUTCMonth() + 1}/${new Date(
                        workout.date
                      ).getUTCDate()}/${new Date(workout.date).getUTCFullYear()}`
                    : "No Date"}
                </th>
                <th onClick={handleDelete} className="cursor-pointer">
                  <HiOutlineTrash className="h-6 w-6 " />
                </th>
              </tr>
            </thead>
            <tbody>
              {workout?.exercises?.exercises.map((item, index) => (
                <tr key={index}>
                  <td colSpan="3">
                    <div className="border border-gray-400 m-2 p-2">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th colSpan="3" className="text-center">
                              Exercise {index + 1}: {item[0]}
                            </th>
                          </tr>
                          <tr>
                            <td className="text-center">Set</td>
                            <td className="text-center">Weight</td>
                            <td className="text-center">Reps</td>
                          </tr>
                        </thead>
                        <tbody>
                          {item[1].map((set, setIndex) => (
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
      )}
    </div>
  );
}

export default Single;
