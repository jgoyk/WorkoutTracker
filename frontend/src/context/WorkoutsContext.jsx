import { createContext, useReducer } from "react";
import PropTypes from 'prop-types';

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type){
        case 'SET_WORKOUTS':
            return {workouts: action.payload}
        case 'CREATE_WORKOUT':
            return {workouts: [action.payload, ...state.workouts]}
        case 'DELETE':
            return {workouts: state.workouts.filter((workout)=> workout._id !== action.payload._id)}
        default :
            return state
    }
}




export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null})
    
    
    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}
WorkoutContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};