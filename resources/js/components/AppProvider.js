import React from "react";

import App from "./App";
import { UserProvider } from "./contexts/user/UserContext";

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

const AppProvider = () => {
    return (
        <>
            <UserProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </UserProvider>
        </>
    );
};

export default AppProvider;
