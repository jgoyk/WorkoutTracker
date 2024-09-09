import { useEffect } from "react"
import WorkoutForm from '../components/WorkoutForm'


function Home() {
  


  
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="text-xl font-semibold p-2 m-4 text-center">All Workouts</div>
      {/* {workouts && workouts.map((workout, idx) => (
        <WorkoutDetails key={idx} workout={workout}/>
        
      ))} */}
      <WorkoutForm/>
    </div>
  )
}
  
export default Home
  