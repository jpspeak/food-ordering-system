import React, { useEffect, useState } from "react";

import NavBar from "../../NavBar";
import Carousel from "./Carousel";

import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    clearPaddingOnSm: {
        [theme.breakpoints.down("sm")]: {
            padding: 0
        }
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "brightness(75%)"
    },
    imgContainer: {
        position: "relative",
        width: "100%",
        paddingBottom: "100%",
        cursor: "pointer"
    },
    imgSubContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: theme.spacing(0.5)
    },
    categoryName: {
        color: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        fontWeight: "bold"
    },
    categoryNameResponsive: {
        [theme.breakpoints.only("xs")]: {
            fontSize: 18
        },
        [theme.breakpoints.only("sm")]: {
            fontSize: 24
        },
        [theme.breakpoints.up("md")]: {
            fontSize: 32
        }
    }
}));

const Home = () => {
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    const classes = useStyles();
    const loadCategories = () => {
        axios({
            method: "GET",
            url: "/api/categories"
        }).then(({ data }) => {
            setCategories(data);
        });
    };
    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <>
            <NavBar withBasket />
            <Container maxWidth="lg" className={classes.clearPaddingOnSm}>
                <Carousel />
                <Grid container className="p-1">
                    {categories.map(category => (
                        <Grid
                            item
                            xs={6}
                            key={category.id}
                            onClick={() => {
                                history.push(`/menu?category=${category.id}`);
                            }}
                        >
                            <Box className={classes.imgContainer}>
                                <Box className={classes.imgSubContainer}>
                                    <img
                                        src={category.image}
                                        className={`${classes.img} hover-design`}
                                    />
                                </Box>
                                <Typography
                                    className={`${classes.categoryName} ${classes.categoryNameResponsive}`}
                                >
                                    {category.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Home;
