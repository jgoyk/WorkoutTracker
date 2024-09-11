import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../context/authContext"


function NavBar() {
  const {currentUser, logout} = useContext(AuthContext)
    return (
      <div className="flex flex-row border-b-2 border-gray-400 py-2 px-10 justify-around">
        <NavLink to={"/"} 
          className={({ isActive, isPending }) =>
            isPending ? "text-red-400 font-bold text-3xl p-3" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl p-3" : "font-bold text-3xl p-3"
          }>
          All Workouts
        </NavLink>
        <NavLink to={"/charts"} 
          className={({ isActive, isPending }) =>
            isPending ? "text-red-400 font-bold text-3xl p-3" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl p-3" : "font-bold text-3xl p-3"
          }>
            Charts
        </NavLink>
        <NavLink to={"/exercises"} 
          className={({ isActive, isPending }) =>
            isPending ? "text-red-400 font-bold text-3xl p-3" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl p-3" : "font-bold text-3xl p-3"
          }>
            All Exercises
        </NavLink>
        {/* <div>{currentUser?.username}</div> */}
        {currentUser ? 
          <button onClick={logout} className="font-semibold text-xl">Logout</button> : 
          <div className="flex flex-row gap-6 border bg-gray-400 rounded-md p-2">
            <NavLink to={"/login" }
              className={({ isActive, isPending }) =>
                isPending ? "text-red-400 font-bold text-3xl bg-gray-300 rounded-md" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl bg-gray-300 rounded-md p-1" : "font-bold text-3xl bg-gray-300 rounded-md hover:bg-gray-600 hover:text-white p-1"
              }>
              Login
            </NavLink>
            <NavLink to={"/register" }
              className={({ isActive, isPending }) =>
                isPending ? "text-red-400 font-bold text-3xl" : isActive ? "text-green-600 drop-shadow-lg font-bold text-3xl bg-gray-300 rounded-md p-1" : "font-bold text-3xl  bg-gray-300 rounded-md hover:bg-gray-600 hover:text-white p-1"
              }>
              Register
            </NavLink>
          </div>
        }
      </div>
    )
  }
  
  export default NavBar
  