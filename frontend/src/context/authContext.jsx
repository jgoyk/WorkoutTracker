import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [currentToken, setCurrentToken] = useState(localStorage.getItem("token") || null);

    axios.defaults.withCredentials = true;


    const login = async(inputs) => {
        const res = await axios.post(`${import.meta.env.VITE_DB_URL}/auth/login`, inputs)
        setCurrentUser(res.data.user)
        setCurrentToken(res.data.token);
    }

    const logout = async(inputs) => {
        await axios.post(`${import.meta.env.VITE_DB_URL}/auth/logout`)
        setCurrentUser(null)
        setCurrentToken(null);
    }

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }

        if (currentToken) {
            localStorage.setItem("token", currentToken);
        } else {
            localStorage.removeItem("token");
        }
    }, [currentUser, currentToken]);

    return (
        <AuthContext.Provider value={{currentUser,currentToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}