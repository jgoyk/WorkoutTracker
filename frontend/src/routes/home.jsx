import { useEffect } from "react"
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";

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
      {workouts && workouts.map((workout, idx) => (
        <WorkoutDetails key={idx} workout={workout}/>
        
      ))}
      <WorkoutForm/>
    </div>
  )
}
  
export default Home
  