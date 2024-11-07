import ExerciseDisplay from "@/components/ExerciseDisplay";
import { AuthContext } from "@/context/authContext";
import { ExerciseContext } from "@/context/exerciseContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react"


function Exercises() {
  const {exercises, getExercises} = useContext(ExerciseContext);
  const { currentUser, currentToken } = useContext(AuthContext);
  const [pageNum, setPageNum] = useState(1);
  console.log(exercises);
    return (
      <div className="w-full h-full flex flex-col ">
        <div>Exercises Page</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          {exercises.map((exerciseData, idx) => (
            <ExerciseDisplay exercise={exerciseData}/>
          ))}
        </div>
      </div>
    )
  }
  
  export default Exercises
  