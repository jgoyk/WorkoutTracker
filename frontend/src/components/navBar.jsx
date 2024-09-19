import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { Button } from "@/components/ui/button"

function NavBar() {
  const {currentUser, logout} = useContext(AuthContext)
    return (
      <div className="flex flex-row border-b-2 border-gray-400 py-2 px-10 justify-between">
        <div className="flex flex-row gap-6">
          <div className="flex font-semibold text-2xl px-3 items-center cursor-default">Workout Tracker</div>
          <NavLink to={"/"} 
            className={({ isActive, isPending }) =>
              `flex font-semibold text-xl px-3 items-center hover:text-blue-700 ${isPending ? "text-blue-100 drop-shadow-lg" : isActive ? "text-blue-600 drop-shadow-lg" : ""}`
            }>
            All Workouts
          </NavLink>
          <NavLink to={"/charts"} 
            className={({ isActive, isPending }) =>
              `flex font-semibold text-xl px-3 items-center hover:text-blue-600 ${isPending ? "text-blue-100 drop-shadow-lg" : isActive ? "text-blue-600 drop-shadow-lg" : ""}`
            }>
              Charts
          </NavLink>
          <NavLink to={"/exercises"} 
            className={({ isActive, isPending }) =>
              `flex font-semibold text-xl px-3 items-center hover:text-blue-600 ${isPending ? "text-blue-100 drop-shadow-lg" : isActive ? "text-blue-600 drop-shadow-lg" : ""}`
            }>
              All Exercises
          </NavLink>
        </div>
        
        {currentUser ? 

          <Button onClick={logout} className="">Logout</Button> 
        
          :
          <div className="flex flex-row min-h-full items-center gap-4">
            <NavLink to={"/login" }>
              <Button className="">
                Login
              </Button>
            </NavLink>
            <NavLink to={"/register" }>
              <Button className="">
                Register
              </Button>
            </NavLink>
          </div>
        }
      </div>
    )
  }
  
  export default NavBar
  