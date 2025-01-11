import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const ExerciseDisplay = ({ exercise }) => {
  const showImages = false;
    return (
      <Card className="w-full p-2">
        <CardHeader>
          <CardTitle>{exercise.name || "Exercise Name"}</CardTitle>
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