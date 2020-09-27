import React, { createContext, useReducer } from "react";

const initialState = {
    products: []
};

const ProductsContext = createContext();

const { Provider } = ProductsContext;

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "UPDATE_PRODUCTS":
            // console.log(payload);
            return { ...state, products: payload };

        default:
            return state;
    }
};
const ProductsProvider = ({ children }) => {
    const [productsData, productsDispatch] = useReducer(reducer, initialState);
    return (
        <Provider value={{ data: productsData, dispatch: productsDispatch }}>
            {children}
        </Provider>
    );
};

export { ProductsContext, ProductsProvider };
