import React, { createContext, useReducer } from "react";

const initialState = {
    quantity: 1
};

const QuantityContext = createContext();

const { Provider } = QuantityContext;

const reducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case "INCREMENT":
            return { ...state, quantity: state.quantity + 1 };
        case "DECREMENT":
            if (state.quantity == 1) {
                return state;
            }
            return { ...state, quantity: state.quantity - 1 };

        default:
            return state;
    }
};
const QuantityProvider = ({ children }) => {
    const [quantityData, quantityDispatch] = useReducer(reducer, initialState);
    return (
        <Provider value={{ data: quantityData, dispatch: quantityDispatch }}>
            {children}
        </Provider>
    );
};

export { QuantityContext, QuantityProvider };
