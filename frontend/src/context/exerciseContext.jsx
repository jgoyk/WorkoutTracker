import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ExerciseContext = createContext();

export const ExerciseContextProvider = ({ children }) => {
    const [exercises, setExercises] = useState([]);
    axios.defaults.withCredentials = true;
    const getExercises = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_DB_URL}/exercises`);
            setExercises(res.data);
        } catch (error) {
            console.error("Failed to fetch exercises:", error);
        }
    };

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <ExerciseContext.Provider value={{ exercises, getExercises }}>
            {children}
        </ExerciseContext.Provider>
    );
};
