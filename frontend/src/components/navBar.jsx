import { Link, NavLink } from "react-router-dom"


function NavBar() {
  
    return (
      <div className="flex flex-row border-b-2 border-gray-400 py-2 px-10 justify-around">
        <NavLink to={"/"} 
          className={({ isActive, isPending }) =>
            isPending ? "text-red-400 font-bold text-3xl" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl" : "font-bold text-3xl"
          }>
          All Workouts
        </NavLink>
        <NavLink to={"/charts"} 
          className={({ isActive, isPending }) =>
            isPending ? "text-red-400 font-bold text-3xl" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl" : "font-bold text-3xl"
          }>
            Charts
        </NavLink>
        <NavLink to={"/exercises"} 
          className={({ isActive, isPending }) =>
            isPending ? "text-red-400 font-bold text-3xl" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl" : "font-bold text-3xl"
          }>
            All Exercises
        </NavLink>
      </div>
    )
  }
  
  export default NavBar
  