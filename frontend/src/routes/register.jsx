import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


function Register() {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })
    const [err, setError] = useState(null)

    const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const navigate = useNavigate();


    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            await axios.post(`${import.meta.env.VITE_DB_URL}/auth/register`, inputs)
            navigate('/login')
        } catch(err){
            setError(err.response.data)
        }
    }

    return (
      <div className="w-full h-full flex flex-col p-2">
        <div className="font-bold text-2xl text-center">Register</div>
        {err && <p className="text-red-600 font-bold text-center pt-4">Error: {err}</p>}
        <form className="p-2">
            <div className="flex flex-col p-2 gap-3">
                <label htmlFor="username" className="font-semibold">Username</label>
                <input required type="text" placeholder="username" name='username' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                <label htmlFor="email" className="font-semibold">Email</label>
                <input required type="email" placeholder="email" name='email' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                <label htmlFor="password" className="font-semibold">Password</label>
                <input required type="password" placeholder="password" name='password' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className="flex flex-row justify-center w-full py-2">
                <button onClick={handleSubmit} className="shadow-md rounded-full bg-green-300 p-2 border border-black hover:bg-green-400">Register</button>
            </div>
        </form>
        <span className="text-center">
                Do you have an account? <Link to="/login" className="text-blue-600 font-semibold underline hover:text-blue-500">Login</Link>
            </span>
      </div>
    )
  }
  
  export default Register
  