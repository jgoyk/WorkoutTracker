import React, { useContext, useState } from "react";
import ExerciseDisplay from "@/components/ExerciseDisplay";
import FilterPopup from "@/components/FilterPopup";
import { ExerciseContext } from "@/context/exerciseContext";

function Exercises() {
  const { exercises } = useContext(ExerciseContext);
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  
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
  

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Exercises Page</h1>
        <button
          onClick={() => setShowFilterPopup(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4">
        {filteredExercises.map((exerciseData, idx) => (
          <ExerciseDisplay key={idx} exercise={exerciseData} />
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
