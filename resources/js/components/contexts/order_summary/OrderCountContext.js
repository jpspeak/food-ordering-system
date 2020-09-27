import React, { createContext, useReducer } from "react";

const initialState = {
    orderCount: 0
};

const OrderCountContext = createContext();

const { Provider } = OrderCountContext;

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LOAD_ORDER_COUNT":
            return {
                ...state,
                orderCount: payload
            };

        case "RESET_COUNT":
            return {
                ...state,
                orderCount: 0
            };

        default:
            return state;
    }
};
const OrderCountProvider = ({ children }) => {
    const [orderCountData, orderCountDispatch] = useReducer(
        reducer,
        initialState
    );
    return (
        <Provider
            value={{ data: orderCountData, dispatch: orderCountDispatch }}
        >
            {children}
        </Provider>
    );
};

export { OrderCountContext, OrderCountProvider };
