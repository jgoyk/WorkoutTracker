import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { Button } from "@/components/ui/button";


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
        <div className="font-semibold text-center text-xl py-2">Register</div>
        <div className="flex flex-row w-full justify-center p-2">
            <div className="flex flex-col max-w-md border-2 rounded-md border-gray-600 py-8 px-4 bg-gray-300">
                {err && <p className="text-red-600 font-bold text-center pt-4">Error: {err}</p>}
                <form className="px-16 py-2">
                    <div className="flex flex-col p-2 gap-3">
                        <label htmlFor="username" className="font-semibold text-center">Username</label>
                        <input required type="text" placeholder="username" name='username' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                        <label htmlFor="email" className="font-semibold text-center">Email</label>
                        <input required type="email" placeholder="email" name='email' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                        <label htmlFor="password" className="font-semibold text-center">Password</label>
                        <input required type="password" placeholder="password" name='password' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    </div>
                    <div className="flex flex-row justify-center w-full py-2">
                        <Button onClick={handleSubmit} className="">Register</Button>
                    </div>
                </form>
            <span className="text-center">
                Have an account? <Link to="/login" className="text-blue-600 font-semibold underline hover:text-blue-500">Login</Link>
            </span>
            </div>
        </div>
        
      </div>
    )
  }
  
  export default Register
  