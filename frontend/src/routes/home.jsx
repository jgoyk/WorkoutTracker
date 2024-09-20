import { useContext, useEffect, useState } from "react"
import WorkoutForm from '../components/WorkoutForm'
import { AuthContext } from "../context/authContext"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails"
import { toast } from "sonner"


function Home() {
  const [workouts, setWorkouts] = useState([])
  const { currentUser, currentToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteWorkout = (workoutId) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter(workout => workout.id !== workoutId));
    toast.success("Workout has been deleted successfully.")
  };
  const handleAddWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
    toast.success("Workout has been added successfully.")

  };
  const handleEditWorkout = (updatedWorkout) => {
    setWorkouts((prevWorkouts) => prevWorkouts.map(workout => workout.id === updatedWorkout.id ? workout : updatedWorkout));
    toast.success("Workout has been edited successfully.")
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {

        if (!currentToken) {
          console.log('No token found, user might not be authenticated');
          setLoading(false);
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_DB_URL}/workouts`, {
          headers: {
            Authorization: `Bearer ${currentToken}`
          }
        });
        setWorkouts(res.data);
      } catch (err) {
        console.error('Error fetching workouts:', err);
      }
      setLoading(false);
    };
    setLoading(false);
    if (currentUser && currentToken) {
      fetchData();
    }
  }, [currentUser, currentToken]);


  
  return (
    <div className="w-full h-full flex flex-col ">
      {workouts.map((workout, idx) => (
        <WorkoutDetails currentUser={currentUser} currentToken={currentToken} key={idx} workout={workout} onDeleteWorkout={handleDeleteWorkout} onEditWorkout={handleEditWorkout}/>
      ))}
      {loading && <div className="font-bold text-center p-2 text-2xl text-blue-600">Loading...</div>}
      {!currentUser ?
        <div className="font-bold text-center p-2 text-2xl text-red-600">
          Please login to see your workouts
        </div> 
        
        :
        <WorkoutForm currentUser={currentUser} currentToken={currentToken} onAddWorkout={handleAddWorkout}/>
      }
      
    </div>
  )
}
  
export default Home
  