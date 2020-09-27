import React, { createContext, useReducer } from "react";

const initialState = {
    orderSummary: undefined
};

const OrderSummaryContext = createContext();

const { Provider } = OrderSummaryContext;

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "UPDATE_ORDER_SUMMARY":
            return {
                ...state,
                orderSummary: { ...state.orderSummary, ...payload }
            };
        case "DELETE_ORDER_SUMMARY":
            return {
                ...state,
                orderSummary: undefined
            };

        default:
            return state;
    }
};
const OrderSummaryProvider = ({ children }) => {
    const [orderSummaryData, orderSummaryDispatch] = useReducer(
        reducer,
        initialState
    );
    return (
        <Provider
            value={{ data: orderSummaryData, dispatch: orderSummaryDispatch }}
        >
            {children}
        </Provider>
    );
};

export { OrderSummaryContext, OrderSummaryProvider };
