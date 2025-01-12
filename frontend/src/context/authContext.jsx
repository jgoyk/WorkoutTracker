import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [currentToken, setCurrentToken] = useState(localStorage.getItem("token") || null);

    axios.defaults.withCredentials = true;


    const login = async(inputs) => {
        const res = await axios.post(`${import.meta.env.VITE_DB_URL}/auth/login`, inputs)
        const user = res.data.user;
        user.favoriteExercises = user.favoriteExercises || [];
        setCurrentUser(user);
        setCurrentToken(res.data.token);
    }

    const logout = async(inputs) => {
        await axios.post(`${import.meta.env.VITE_DB_URL}/auth/logout`)
        setCurrentUser(null)
        setCurrentToken(null);
    }

    const setFavoriteExercises = async (updatedFavorites) => {
        if (!currentUser) return;

        try {
            await axios.put(`${import.meta.env.VITE_DB_URL}/auth/favorites`, {
                userId: currentUser.id,
                favorites: updatedFavorites,
            });

            setCurrentUser({ ...currentUser, favoriteExercises: updatedFavorites });
        } catch (error) {
            console.error("Error updating favorite exercises:", error);
        }
    };

    const toggleFavoriteExercise = (exerciseId) => {
        if (!currentUser) return;
        const favorites = currentUser.favoriteExercises || [];
        const updatedFavorites = favorites.includes(exerciseId)
            ? favorites.filter((id) => id !== exerciseId) 
            : [...favorites, exerciseId]; 

    setFavoriteExercises(updatedFavorites);
    };

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
        <AuthContext.Provider value={{currentUser,currentToken, login, logout, toggleFavoriteExercise}}>
            {children}
        </AuthContext.Provider>
    )
}