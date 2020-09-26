import React, { useState, useContext } from "react";

import { UserContext } from "../../contexts/user/UserContext";

import { Paper, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";

import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    mainContainer: {
        width: "100%",
        maxWidth: 400,
        margin: "10px auto",
        padding: theme.spacing(1)
    },
    input: {
        padding: theme.spacing(1),
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        width: "100%"
    }
}));
const Login = () => {
    const userContext = useContext(UserContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const classes = useStyles();
    const handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prevState => {
            return { ...prevState, [name]: value };
        });
    };
    const login = e => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "/api/auth/login",
            data: formData
        })
            .then(({ data }) => {
                localStorage.setItem("userToken", data.access_token);
                axios({
                    method: "GET",
                    url: "/api/auth/user",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "userToken"
                        )}`
                    }
                })
                    .then(({ data }) => {
                        userContext.dispatch({
                            type: "UPDATE_USER",
                            payload: data
                        });
                        history.replace("/");
                    })
                    .catch(err => {});
            })
            .catch(err => {});
    };
    return (
        <>
            <Box className={classes.mainContainer}>
                <Typography className="text-center mt-5">
                    <LockIcon style={{ fontSize: 50 }} />
                </Typography>
                <Typography
                    variant="h4"
                    className="text-center my-1 font-weight-light"
                >
                    Log in
                </Typography>
                <Paper variant="outlined" className="p-4 mb-2">
                    <form onSubmit={login}>
                        <Typography className="font-weight-bold my-1">
                            Email address
                        </Typography>
                        <input
                            type="email"
                            className={classes.input}
                            name="email"
                            onChange={handleInput}
                            required
                        />
                        <Box display="flex" className="mt-3 mb-1">
                            <Typography className="font-weight-bold flex-grow-1 ">
                                Password
                            </Typography>
                            <a href="#">Forgot password? </a>
                        </Box>
                        <input
                            type="password"
                            className={classes.input}
                            name="password"
                            onChange={handleInput}
                            required
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            className="w-100 mt-4"
                            type="submit"
                        >
                            Log In
                        </Button>
                    </form>
                </Paper>

                <Paper className="p-4" variant="outlined">
                    <Typography>
                        No account yet?{" "}
                        <span>
                            <a href="#">Create account</a>
                        </span>
                    </Typography>
                </Paper>
            </Box>
        </>
    );
};

export default Login;
