import React from "react";
import ReactDOM from "react-dom";
import AppProvider from "./AppProvider";

if (document.getElementById("app")) {
    ReactDOM.render(<AppProvider />, document.getElementById("app"));
}
