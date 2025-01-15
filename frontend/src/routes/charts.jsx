import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import { AuthContext } from "@/context/authContext";

// need to register the chart
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const Charts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [hoveredWorkout, setHoveredWorkout] = useState(null);
  const lastHoveredIndex = useRef(null);
  const { currentUser, currentToken } = useContext(AuthContext);
  const [selectedFormula, setSelectedFormula] = useState("Brzycki");
  const oneRepMaxFormulas = ["Brzycki", "Epley", "McGlothin", "Lombardi", "Mayhew", "OConner", "Wathan"];

  useEffect(() => {
    const fetchData = async () => {
      if (!currentToken) {
        console.log("No token found, user might not be authenticated");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_DB_URL}/workouts`, {
          headers: {
            Authorization: `Bearer ${currentToken}`
          },
        });
        setWorkouts(res.data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // exercise data group
  const exerciseData = {};

  workouts.forEach(({ exercises: { exercises }, date }) => {
    exercises.forEach(([name, , sets]) => {
      if (!exerciseData[name]) exerciseData[name] = {};
      const formattedDate = new Date(date).toISOString().split("T")[0];
      if (!exerciseData[name][formattedDate]) {
        exerciseData[name][formattedDate] = [];
      }
      sets.forEach(([weight, reps]) => {
        const oneRepMax = oneRepMaxCalc(weight, reps);
        exerciseData[name][formattedDate].push({ weight, reps, oneRepMax });
      });
    });
  });

  // handles missing dates
  const interpolateDates = (data) => {
    const dates = Object.keys(data).sort();
    const result = {};
    let current = new Date(dates[0]);
    const end = new Date(dates[dates.length - 1]);

    while (current <= end) {
      const formatted = current.toISOString().split("T")[0];
      result[formatted] = data[formatted] || [];
      current.setDate(current.getDate() + 1);
    }
    return result;
  };


  const generateChartData = (data) => {
    const interpolatedData = interpolateDates(data);
    const dates = Object.keys(interpolatedData).sort();
    const max1RMs = dates.map(
      (date) =>
        interpolatedData[date].reduce((max, { oneRepMax }) => Math.max(max, oneRepMax), 0) || null
    );

    return {
      labels: dates,
      datasets: [
        {
          label: "Max 1RM",
          data: max1RMs,
          borderColor: "blue",
          tension: 0.3, //this is what smooths line
          fill: false,
        },
      ],
    };
  };

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
    setHoveredWorkout(null);
    lastHoveredIndex.current = null; 
  };

  const handleFormulaChange = (event) => {
    setSelectedFormula(event.target.value);
  };

  const handleHover = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      if (lastHoveredIndex.current !== index) {
        const date = Object.keys(exerciseData[selectedExercise]).sort()[index];
        setHoveredWorkout({ date, details: exerciseData[selectedExercise][date] });
        lastHoveredIndex.current = index; 
      }
    } else if (lastHoveredIndex.current !== null) {
      setHoveredWorkout(null);
      lastHoveredIndex.current = null; 
    }
  };

  function oneRepMaxCalc (weight, reps) {
    var oneRepMax = 0;
    switch (selectedFormula) {
      case "Brzycki":
        oneRepMax = weight / (1.0278 - 0.0278 * reps);
        break;
      case  "Epley":
        oneRepMax = weight * (1 + (0.0333 * reps)) 
        break;
      case "McGlothin":
        oneRepMax = weight * ((reps + 1) / (reps + 2));
        break;
      case "Lombardi":
        oneRepMax = weight * (Math.pow(reps, 0.10)); 
        break;
      case "Mayhew":
        oneRepMax = (100 * weight) / (52.2 + (41.9 * Math.pow(Math.E,-0.055 * reps)))
        break;
      case "OConner":
        oneRepMax = weight * (1 + (0.025 * reps))
        break;
      case "Wathan":
        oneRepMax = (100 * weight) / (48.8 + (53.8 * Math.pow(Math.E,-0.075) * reps))
        break;
    }
    return oneRepMax;
  }
  return (
    <div className="p-4 flex">
      {currentUser ? 
        <>
          <div className="flex-grow">
            <h1 className="text-2xl text-center mb-4">Exercise Progression</h1>
            
            <div className="mb-4 flex flex-col justify-center items-center">
              <div className="text-sm italic">Select a 1RM Estimation Formula</div>
              <select
                className="p-2 border rounded w-1/3"
                value={selectedFormula || ""}
                id="formulaSelect"
                onChange={handleFormulaChange}
              >
                {oneRepMaxFormulas.map((formula) => (
                  <option key={formula} value={formula}>
                    {formula}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-row justify-center">
              <select
                className="p-2 border rounded"
                value={selectedExercise || ""}
                onChange={handleExerciseChange}
              >
                <option value="" disabled>
                  Select an exercise
                </option>
                {Object.keys(exerciseData).map((exercise) => (
                  <option key={exercise} value={exercise}>
                    {exercise}
                  </option>
                ))}
              </select>
            </div>
            {selectedExercise && (
              <Line
                data={generateChartData(exerciseData[selectedExercise])}
                options={{
                  responsive: true,
                  onHover: (event, elements) => handleHover(event, elements),
                  scales: {
                    x: { title: { text: "Date", display: true } },
                    y: { title: { text: "Estimated 1RM (lbs)", display: true } },
                  },
                }}
              />
            )}
          </div>
          <div className="w-1/3 p-4 border-l">
            <h2 className="text-xl mb-2">Workout Details</h2>
            {hoveredWorkout ? (
              <div>
                <p className="font-bold mb-2">{hoveredWorkout.date}</p>
                {hoveredWorkout.details.map((set, idx) => (
                  <p key={idx}>
                    <div className="font-semibold">Set {idx+1}:</div> Weight: <span className="font-semibold">{set.weight} lbs</span>, Reps: <span className="font-semibold">{set.reps}</span>, E1RM: {oneRepMaxCalc(set.weight, set.reps).toFixed(2)} lbs
                    
                  </p>
                ))}
              </div>
            ) : (
              <p>Hover over a data point to see details</p>
            )}
          </div>
        </>
      : 
      <div className="w-full justify-center">
        <h1 className="text-2xl text-center mb-4">Exercise Progression</h1>
        <div className="text-center text-red-700 font-semibold italic">Please login to see your workout data</div>
      </div>
      }
      
    </div>
  );
};

export default Charts;
