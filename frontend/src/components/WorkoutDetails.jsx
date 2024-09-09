import { HiOutlineTrash } from "react-icons/hi";


const WorkoutDetails = ({ workout }) => {


    const handleDelete = async () => {
        
    }
    return (
        <div key={workout.id} className="p-2 ">
          <table className="table-auto border border-slate-500">
            <thead className="border border-slate-500">
              <tr className="flex flex-row justify-around p-2">
                <th colSpan="1">{workout.title ? workout.title : "Workout"}</th>
                <th colSpan="1" className="font-semibold italic">{workout.date ? `${new Date(workout.date).getUTCMonth()+1}/${new Date(workout.date).getUTCDate()}/${new Date(workout.date).getUTCFullYear()}` : "No Date"}</th>
                <th onClick={handleDelete}><HiOutlineTrash className="h-6 w-6" /></th>
              </tr>
              
            </thead>
            <tbody >
              {workout.exercises.exercises.map((item, index) => (
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
                          {item[1].map((set, setIndex) => (
                            <tr key={setIndex}>
                              <td className="text-center">{setIndex + 1}</td>
                              <td className="text-center">{set[0]}</td>
                              <td className="text-center">{set[1]}</td>
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
    )
}
export default WorkoutDetails