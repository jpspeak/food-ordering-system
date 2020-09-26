import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Product from "./pages/product/Product";
import OrderSummary from "./pages/order_summary/OrderSummary";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { red, amber } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[900]
        },
        secondary: {
            main: amber[500]
        }
    }
});

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
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
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
