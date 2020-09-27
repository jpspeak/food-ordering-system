import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UserContext } from "./contexts/user/UserContext";
import { ProductsProvider } from "./contexts/products/ProductsContext";
import { ProductProvider } from "./contexts/products/ProductContext";
import { QuantityProvider } from "./contexts/products/QuantityContext";
import { OrderSummaryProvider } from "./contexts/order_summary/OrderSummaryContext";
import { OrderCountContext } from "./contexts/order_summary/OrderCountContext";

import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Product from "./pages/product/Product";
import OrderSummary from "./pages/order_summary/OrderSummary";
import OrderHistory from "./pages/order_history/OrderHistory";
import "./App.css";

const App = () => {
    const userContext = useContext(UserContext);
    const orderCountContext = useContext(OrderCountContext);
    const loadUser = () => {
        axios({
            method: "GET",
            url: "/api/auth/user",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(({ data }) => {
                userContext.dispatch({ type: "UPDATE_USER", payload: data });
            })
            .catch(err => {
                userContext.dispatch({ type: "DELETE_USER" });
            });
    };
    const loadOrderCount = () => {
        axios({
            method: "GET",
            url: "/api/bag/count",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(({ data }) => {
                orderCountContext.dispatch({
                    type: "LOAD_ORDER_COUNT",
                    payload: data
                });
            })
            .catch(err => {});
    };
    useEffect(() => {
        loadUser();
        loadOrderCount();
    }, []);
    return (
        <>
            <Router>
                <Route exact strict path="/login">
                    <Login />
                </Route>
                <Route exact strict path="/">
                    <Home />
                </Route>
                <Route exact strict path="/menu">
                    <ProductsProvider>
                        <Menu />
                    </ProductsProvider>
                </Route>
                <Route exact strict path="/products/:productId">
                    <ProductProvider>
                        <QuantityProvider>
                            <Product />
                        </QuantityProvider>
                    </ProductProvider>
                </Route>
                <Route exact strict path="/order-summary">
                    <OrderSummaryProvider>
                        <OrderSummary />
                    </OrderSummaryProvider>
                </Route>
                <Route exact strict path="/order-history">
                    <OrderHistory />
                </Route>
            </Router>
        </>
    );
};

export default App;
