import ExerciseDisplay from "@/components/ExerciseDisplay";
import { AuthContext } from "@/context/authContext";
import { ExerciseContext } from "@/context/exerciseContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function Exercises() {
  const {exercises, getExercises} = useContext(ExerciseContext);
  const [pageNum, setPageNum] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    if (exercises) {
      setFilteredExercises(exercises);
    }
  }, [exercises]);

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    const filteredItems = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setFilteredExercises(filteredItems);
  }
  
  console.log(exercises);
    return (
      <div className="w-full h-full flex flex-col ">
        <div className="text-xl font-semibold text-center pt-2">Exercises Page</div>
        <div className="text-center">Showing exercises: {(pageNum-1)*8+1} to {(pageNum)*8} out of {filteredExercises.length}</div>
        <div className="flex flex-row justify-center gap-4">
          {pageNum>1 && <FaArrowLeft onClick={() => setPageNum(pageNum-1)} className="float-right"/>}
          <FaArrowRight onClick={() => setPageNum(pageNum+1)} className="float-left"/>
        </div>
        <div className="flex flex-row justify-center p-2">
          <input
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder='Type to search'
            className="w-1/2 p-2"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
          {

          }
          {filteredExercises.filter((filteredItem, index) => index < pageNum*8 && index>(pageNum-1)*8-1).map((exerciseData, idx) => (
            <ExerciseDisplay exercise={exerciseData}/>
          ))}
        </div>
      </div>
    )
  }
  
  export default Exercises
  