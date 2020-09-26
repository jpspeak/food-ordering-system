import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UserContext } from "./contexts/user/UserContext";

import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Product from "./pages/product/Product";
import OrderSummary from "./pages/order_summary/OrderSummary";
import OrderHistory from "./pages/order_history/OrderHistory";
import "./App.css";

const App = () => {
    const userContext = useContext(UserContext);
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
    useEffect(() => {
        loadUser();
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
                    <Menu />
                </Route>
                <Route exact strict path="/product">
                    <Product />
                </Route>
                <Route exact strict path="/order-summary">
                    <OrderSummary />
                </Route>
                <Route exact strict path="/order-history">
                    <OrderHistory />
                </Route>
            </Router>
        </>
    );
};

export default App;
