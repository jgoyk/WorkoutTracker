import { useEffect } from "react"
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(()=> {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts')
      const json = await response.json()

      if(response.ok){
        dispatch({type:'SET_WORKOUTS', payload:json})
      }
      
    } 

    fetchWorkouts()

  },[])


    return (
      <div className="w-full h-full flex flex-col ">
        <div className="text-xl font-semibold p-2 m-4 text-center">All Workouts</div>
        {workouts && workouts.map((workout) => (
          <div key={workout._id} className="p-2 ">
            <table className="table-auto border border-slate-500">
              <thead className="border border-slate-500">
                <tr className="flex flex-row justify-around p-2">
                  <th colSpan="1">{workout.title}</th>
                  <th></th>
                  <th colSpan="1" className="font-semibold italic">{new Date(workout.date).getUTCMonth()+1}/{new Date(workout.date).getUTCDate()}/{new Date(workout.date).getUTCFullYear()}</th>
                </tr>
                
              </thead>
              <tbody >
                {workout.exercises.slice(0, workout.numExercises).map((item, index) => (
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
                            {item[2].slice(0, item[1]).map((set, setIndex) => (
                              <tr key={setIndex}>
                                <td className="text-center">{setIndex + 1}</td>
                                <td className="text-center">{set[1]}</td>
                                <td className="text-center">{set[0]}</td>
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
          
        ))}
        <WorkoutForm/>
      </div>
    )
  }
  
  export default Home
  