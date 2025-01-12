import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";
const ExerciseDisplay = ({ exercise, currentUser }) => {
  const showImages = false;
  const [favoriteExercises, setFavoriteExercises] = useState([]);
  const {toggleFavoriteExercise} = useContext(AuthContext)
    
  useEffect(() => {
    if (currentUser) {
      setFavoriteExercises(currentUser.favoriteExercises || []);
    }
  }, [currentUser]);

  //console.log(currentUser);
  //console.log(exercise);

  return (
    <Card className="w-full p-2">
      <CardHeader>
        <CardTitle><div className="flex flex-row justify-between">{exercise.name || "Exercise Name"}{currentUser ? favoriteExercises && (favoriteExercises?.includes(exercise._id) ? <HiStar className="hover:scale-110" onClick={()=>toggleFavoriteExercise(exercise._id)}/> : <HiOutlineStar className="hover:scale-110" onClick={()=>toggleFavoriteExercise(exercise._id)}/>) : ""}</div></CardTitle>
        <CardDescription>Category: {exercise.category || "N/A"}</CardDescription>
        <p>Level: {exercise.level || "Unknown"}</p>
        <p>Force: {exercise.force || "N/A"}</p>
        <p>Mechanic: {exercise.mechanic || "N/A"}</p>
        <p>Equipment: {exercise.equipment || "N/A"}</p>
      </CardHeader>

      <CardContent>
        <h4 className="font-semibold mt-2">Primary Muscles</h4>
        <ul className="list-disc list-inside">
          {exercise.primaryMuscles?.length ? (
            exercise.primaryMuscles.map((muscle, index) => (
              <li key={index}>{muscle}</li>
            ))
          ) : (
            <li>No primary muscles specified.</li>
          )}
        </ul>

        <h4 className="font-semibold mt-2">Secondary Muscles</h4>
        <ul className="list-disc list-inside">
          {exercise.secondaryMuscles?.length ? (
            exercise.secondaryMuscles.map((muscle, index) => (
              <li key={index}>{muscle}</li>
            ))
          ) : (
            <li>No secondary muscles specified.</li>
          )}
        </ul>

        <h4 className="font-semibold mt-2">Instructions</h4>
        <ol className="list-decimal list-inside">
          {exercise.instructions?.length ? (
            exercise.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))
          ) : (
            <li>No instructions available.</li>
          )}
        </ol>
        {showImages && (
          <div>
            <h4 className="font-semibold mt-2">Images</h4>
              <div className="flex space-x-2 mt-2">
                {exercise.images?.length ? (
                  exercise.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${exercise.name} step ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))
                ) : (
                  <p>No images available.</p>
                )}
              </div>
          </div>
        ) }
      </CardContent>

      <CardFooter>
        <p className="text-sm">ID: {exercise.id || "N/A"}</p>
      </CardFooter>
    </Card>
  );
};
  
export default ExerciseDisplay;