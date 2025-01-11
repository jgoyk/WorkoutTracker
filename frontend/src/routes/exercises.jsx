import ExerciseDisplay from "@/components/ExerciseDisplay";
import FilterPopup from "@/components/FilterPopup";
import { ExerciseContext } from "@/context/exerciseContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function Exercises() {
  const { exercises } = useContext(ExerciseContext);
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [searchItem, setSearchItem] = useState('');

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

  const handleApplyFilters = (filters) => {
    const areAllFiltersEmpty = Object.values(filters).every((value) => !value);
    if (areAllFiltersEmpty) {
      setFilteredExercises(exercises);
      return;
    }

    const filtered = exercises.filter((exercise) => {
      return (
        (!filters.category || exercise.category === filters.category) &&
        (!filters.level || exercise.level === filters.level) &&
        (!filters.force || exercise.force === filters.force) &&
        (!filters.mechanic || exercise.mechanic === filters.mechanic) &&
        (!filters.equipment || exercise.equipment === filters.equipment)
      );
    });

  
    setFilteredExercises(filtered);
  };

  console.log(exercises);

  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-xl font-bold">Exercises Page</h1>
          <div className="flex flex-row w-full justify-center">
            <div className="flex flex-row justify-center p-2">
              <input
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder='Type to search'
                className="w-full p-2"
              />
            </div>
            <button
              onClick={() => setShowFilterPopup(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Filter
            </button>
          </div>
          <div className="flex flex-row">
            <div className="text-center">Showing exercises: {(pageNum-1)*8+1} to {(pageNum)*8} out of {filteredExercises.length}</div>
            <div className="flex flex-row justify-center gap-4">
              {pageNum>1 && <FaArrowLeft onClick={() => setPageNum(pageNum-1)} className="float-right"/>}
              <FaArrowRight onClick={() => setPageNum(pageNum+1)} className="float-left"/>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
        {filteredExercises.filter((filteredItem, index) => index < pageNum*8 && index>(pageNum-1)*8-1).map((exerciseData, idx) => (
          <ExerciseDisplay exercise={exerciseData}/>
        ))}
      </div>
      {showFilterPopup && (
        <FilterPopup
          onApply={handleApplyFilters}
          onClose={() => setShowFilterPopup(false)}
        />
      )}
    </div>
  );
}

export default Exercises;
