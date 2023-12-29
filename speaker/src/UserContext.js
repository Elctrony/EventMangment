import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
    id: null,
    name:null,
    phone:null,
    email: null,
};

// Create a context
const UserContext = createContext();

// Define a reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

// Create a provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const setUser = (userData) => {
        dispatch({ type: 'SET_USER', payload: userData });
    };

    return (
        <UserContext.Provider value={{ user: state, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
