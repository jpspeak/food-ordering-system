import React, { createContext, useReducer } from "react";

const initialState = {
    user: undefined
};

const UserContext = createContext();

const { Provider } = UserContext;

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "UPDATE_USER":
            // console.log(payload);
            return { ...state, user: payload };
        case "DELETE_USER":
            // console.log(payload);
            return { ...state, user: undefined };
        default:
            return state;
    }
};
const UserProvider = ({ children }) => {
    const [userData, userDispatch] = useReducer(reducer, initialState);
    return (
        <Provider value={{ data: userData, dispatch: userDispatch }}>
            {children}
        </Provider>
    );
};

export { UserContext, UserProvider };
