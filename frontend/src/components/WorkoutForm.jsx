import { useState } from "react"
import { HiCheck, HiChevronLeft, HiChevronRight, HiOutlinePlusCircle, HiOutlineTrash, HiOutlineX } from "react-icons/hi";


const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [numExercises, setNumExercises] = useState(1)
    const [exercises, setExercises] = useState([["", 1, [[0, 0]]],]) // [ [ Name, NumberOfSets, [ {Weight1, Reps1}, ... , {WeightX, RepsX} ] ]
    const [stage, setStage] = useState(0)
    const [date, setDate] = useState(new Date())



    function submitForm(e){
        e.preventDefault();
        var f = document.getElementById('stage0');
        if(f.checkValidity()) 
        {
            if (!document.getElementById('name').value) setTitle("Unnamed Workout")
            setStage(stage+1)
            console.log(exercises)
        } 
        else 
        {
            if (document.getElementById('name').validationMessage) alert("Please name your workout");
            if(document.getElementById('date').validationMessage) alert("Please select a valid date");
        }
    }

    function setExerciseName(e, index) {
        const updatedExercises = exercises.map((exercise, i) =>
          i === index ? [e.target.value, exercise[1], exercise[2]] : exercise
        );
        setExercises(updatedExercises);
      }
    
      function setExerciseSets(index) {
        const updatedExercises = exercises.map((exercise, i) =>
          i === index
            ? [exercise[0], exercise[1] + 1, [...exercise[2], [0, 0]]]
            : exercise
        );
        setExercises(updatedExercises);
      }

      function deleteExercise(index) {
        const updatedExercises = exercises.filter((_, i) => i !== index);
        if (numExercises-1>0){
            setExercises(updatedExercises);
            setNumExercises()
        } else {
            alert("Must have at least one exercise")
        }
    }
    
      function setExerciseWeight(e, idx, index) {
        const updatedExercises = exercises.map((exercise, i) => {
          if (i === idx) {
            const updatedWeight = exercise[2].map((set, j) =>
              j === index ? [parseInt(e.target.value) || 0, set[1]] : set
            );
            return [exercise[0], exercise[1], updatedWeight];
          }
          return exercise;
        });
        setExercises(updatedExercises);
      }
    
      function setExerciseSet(e, idx, index) {
        const updatedExercises = exercises.map((exercise, i) => {
          if (i === idx) {
            const updatedSets = exercise[2].map((set, j) =>
              j === index ? [set[0], parseInt(e.target.value) || 0] : set
            );
            return [exercise[0], exercise[1], updatedSets];
          }
          return exercise;
        });
        setExercises(updatedExercises);
      }
    
    function addExercise() {
        setExercises([...exercises, ["", 1, [[0, 0]]]]);
        setNumExercises(numExercises + 1);
    }



    return (
        <div className=" flex flex-row justify-center">
            {stage == 0 && 
                <div className="" >
                    <HiOutlinePlusCircle onClick={() => setStage(stage+1)} className="h-16 size-16"/>
                </div>
            }
            
            {(stage == 1 || stage==2) &&
                <div className="fixed inset-0 flex items-center justify-center p-16 z-50">
                    <div className="fixed inset-0 flex items-center justify-center p-16 z-50 h-full max-h-screen">
                        <div className="fixed inset-0 w-screen bg-black opacity-50 z-40" onClick={()=> setStage(0)}></div>
                        
                            {stage==1 &&
                                <div className="relative max-w-lg border border-black p-2 rounded-md shadow-lg bg-white z-50">
                                    <div className="flex flex-row justify-between align-middle">
                                        <button type="submit" className=" p-2 flex flex-row items-center h-full hover:scale-110  align-middle" onClick={() => {setStage(stage-1)}}>
                                            <HiOutlineX className="text-center h-full text-red-500 size-6 align-middle"/>
                                        </button>
                                        <button type="submit" className="p-2 flex flex-row items-center h-full hover:scale-110 text-lg" onClick={submitForm}>
                                            Next 
                                            <HiChevronRight className="text-center h-full size-6"/>
                                        </button>
                                    </div>
                                    <form id="stage0" className="">
                                        <div className="text-center font-semibold text-xl p-2 m-4">Add a New Workout</div>
                                        <div className="flex flex-col items-center justify-center p-2 m-4">
                                            <label className="p-2 font-bold">Workout Name: </label>
                                            <input type="text" id="name" onChange={(e) => setTitle(e.target.value)} value={title} className="border h-fit text-center" />
                                            <label className="p-2 font-bold">Date: </label>
                                            <input type="date" id="date" value={date.toISOString().substring(0, 10)} onChange={(e) => setDate(new Date(e.target.value))} className="border" required />
                                            
                                        </div>
                                    </form>
                                    
                                </div>
                            }
                            {stage == 2 &&
                            <div className="relative max-w-lg border border-black p-2 rounded-md bg-white z-50 shadow-lg max-h-[80vh] overflow-hidden">
                                <div className="flex flex-row justify-between">
                                    <div className="p-2 flex flex-row items-center h-full hover:scale-110 cursor-pointer" onClick={() => {setStage(stage-1)}}>
                                        <HiChevronLeft className="text-center size-6"/>
                                        Back
                                    </div>
                                    <div className="p-2 flex flex-row items-center h-full hover:scale-110 cursor-pointer" onClick={() => {setStage(stage)}}>
                                        <HiCheck className="text-center size-6 text-green-700 font-bold"/>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center align-middle">
                                    <div className="font-bold text-center p-2 m-4 text-xl align-bottom h-full">{title}</div>
                                    <div className="font-bold text-center p-2 m-4 text-xl align-bottom h-full">{date.toISOString().substring(0, 10)}</div>
                                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                                </div>
                                <div className="flex flex-row justify-center">
                                    <button onClick={() => addExercise()} className="border border-black rounded-lg shadow-md p-2 m-4">Add an exercise</button>
                                </div>
                                <div className="h-[50vh] overflow-y-auto border m-4 shadow-inner p-4 border-2 border-gray-500/50 rounded-lg py-8">
                                    <div>
                                        {Array(numExercises).fill(0).map((x, idx) => (
                                            <div key={idx} className="flex flex-col ">
                                                <div className="flex flex-row justify-between items-center py-2">
                                                    <div className="flex flex-col items-center font-bold text-center">Exercise {idx + 1}</div>
                                                    <div className="flex items-center font-bold text-center  cursor-pointer align-middle items-center" onClick={() => deleteExercise(idx)}>
                                                        <HiOutlineTrash className="h-6 w-6" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-around">
                                                    <label className="p-2">Exercise Name: </label>
                                                    <input type="text" onChange={(e) => setExerciseName(e, idx)} value={exercises[idx][0]} required className="border"/>
                                                </div>
                                                {Array(exercises[idx][1]).fill(0).map((x, index) => (
                                                    <div key={index} className="flex flex-col">
                                                        <div className="font-bold text-center pb-2">Set {index + 1}</div>
                                                        <div className="flex flex-row justify-around">
                                                            <label className="p-2">Weight:</label>
                                                            <input type="number" onChange={(e) => setExerciseWeight(e, idx, index)} value={exercises[idx][2][index][0]} required className="border"/>
                                                        </div>
                                                        <div className="flex flex-row justify-around">
                                                            <label className="p-2">Reps: </label>
                                                            <input type="number" onChange={(e) => setExerciseSet(e, idx, index)} value={exercises[idx][2][index][1]} required className="border"/>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button onClick={() => setExerciseSets(idx)} className="border border-black rounded-lg shadow-md p-2 m-4">Add another set</button>
                                                <hr className="h-[1.5px] bg-gray-600 border-0 my-2"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                            
                        
                        
                    </div>
                </div>
            }
                
            
            
        </div>
    )
}
export default WorkoutForm;