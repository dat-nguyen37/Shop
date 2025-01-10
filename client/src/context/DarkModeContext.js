import { createContext, useEffect, useReducer } from "react";

const initState = {
    color: JSON.parse(localStorage.getItem('color')) || null,
};

export const DarkModeContext = createContext(initState);

const DarkModeReduce = (state, action) => {
    switch (action.type) {
        case "STATE_DARK":
            return {
                color: 'dark',
            };
        case "STATE_LIGHT":
            return {
                color: 'light', 
            };
        default:
            return state;
    }
};

export const DarkModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReduce, initState);

    useEffect(() => {
            localStorage.setItem('color', JSON.stringify(state.color));
    }, [state.color]); 

    return (
        <DarkModeContext.Provider value={{ color: state.color, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    );
};
