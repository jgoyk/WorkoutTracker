import React, { useState, useEffect } from "react";

const ExerciseSelectionPopup = ({ allExercises, onSelectExercise, onClose, idx, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    level: "",
    force: "",
    mechanic: "",
    equipment: "",
  });
  const [filteredExercises, setFilteredExercises] = useState(allExercises || []);
  const [favorites, toggleFavorites] = useState(false);
  useEffect(() => {
    let result = allExercises || [];

    if (searchTerm.trim() !== "") {
      result = result.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if(favorites){
        result = result.filter((exercise) => {
            return currentUser.favoriteExercises.includes(exercise._id);
        });
    }

    if (Object.values(filters).some((value) => value)) {
        result = result.filter((exercise) => {
            return (
            (!filters.category || exercise.category === filters.category) &&
            (!filters.level || exercise.level === filters.level) &&
            (!filters.force || exercise.force === filters.force) &&
            (!filters.mechanic || exercise.mechanic === filters.mechanic) &&
            (!filters.equipment || exercise.equipment === filters.equipment)
            );
        });
    }

    setFilteredExercises(result);
  }, [searchTerm, filters, allExercises, favorites, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      category: "",
      level: "",
      force: "",
      mechanic: "",
      equipment: "",
    });
  };

  const exerciseSelected = (idx, exercise) => {
    onSelectExercise(idx, exercise);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Select an Exercise</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for an exercise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="space-y-4">
          <div>
            {currentUser &&
                <div className="flex flex-row p-2 justify-center items-center">
                    <h2 className="px-2">Toggle Favorites</h2>
                    <input type="checkbox" id="favorites" name="favorites" value={favorites} onClick={() => toggleFavorites(!favorites)}></input>
                </div>
            }
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">--Please choose an option--</option>
              <option value="strength">Strength</option>
              <option value="stretching">Stretching</option>
              <option value="plyometrics">Plyometrics</option>
              <option value="strongman">Strongman</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="olympic weightlifting">Olympic Weightlifting</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Level</label>
            <select
              name="level"
              value={filters.level}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">--Please choose an option--</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Force</label>
            <select
              name="force"
              value={filters.force}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">--Please choose an option--</option>
              <option value="pull">Pull</option>
              <option value="push">Push</option>
              <option value="static">Static</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Mechanic</label>
            <select
              name="mechanic"
              value={filters.mechanic}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">--Please choose an option--</option>
              <option value="compound">Compound</option>
              <option value="isolation">Isolation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Equipment</label>
            <select
              name="equipment"
              value={filters.equipment}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="">--Please choose an option--</option>
              <option value="barbell">Barbell</option>
              <option value="body only">Body Only</option>
              <option value="cable">Cable</option>
              <option value="machine">Machine</option>
              <option value="bands">Bands</option>
              <option value="kettlebells">Kettlebells</option>
              <option value="medicine ball">Medicine Ball</option>
              <option value="exercise ball">Exercise Ball</option>
              <option value="e-z curl bar">E-Z Curl Bar</option>
              <option value="foam roll">Foam Roller</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Close
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
                onClick={() => {
                  exerciseSelected(idx, exercise);
                }}
              >
                {exercise.name}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No exercises found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExerciseSelectionPopup;
