import React, { useState } from "react";

const FilterPopup = ({ onApply, onClose }) => {
  const [filters, setFilters] = useState({
    category: "",
    level: "",
    force: "",
    mechanic: "",
    equipment: "",
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Filter Exercises</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select name="category"  id="category-select" value={filters.category} onChange={handleInputChange} className="border p-2 rounded">
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
            <select name="level"  id="level-select" value={filters.level} onChange={handleInputChange} className="border p-2 rounded">
                <option value="">--Please choose an option--</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
  
            </select>

          </div>
          <div>
            <label className="block text-sm font-medium">Force</label>
            <select name="force"  id="force-select" value={filters.force} onChange={handleInputChange} className="border p-2 rounded">
                <option value="">--Please choose an option--</option>
                <option value="pull">Pull</option>
                <option value="push">Push</option>
                <option value="static">Static</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Mechanic</label>
            <select name="mechanic"  id="mechanic-select" value={filters.mechanic} onChange={handleInputChange} className="border p-2 rounded">
                <option value="">--Please choose an option--</option>
                <option value="compound">Compound</option>
                <option value="isolation">Isolation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Equipment</label>
            <select name="equipment"  id="equipment-select" value={filters.equipment} onChange={handleInputChange} className="border p-2 rounded">
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
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
