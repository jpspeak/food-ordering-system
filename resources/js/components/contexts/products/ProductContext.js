import React, { createContext, useReducer } from "react";

const initialState = {
    product: undefined
};

const ProductContext = createContext();

const { Provider } = ProductContext;

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "UPDATE_PRODUCT":
            return { ...state, product: payload };

        default:
            return state;
    }
};
const ProductProvider = ({ children }) => {
    const [productData, productDispatch] = useReducer(reducer, initialState);
    return (
        <Provider value={{ data: productData, dispatch: productDispatch }}>
            {children}
        </Provider>
    );
};

export { ProductContext, ProductProvider };
