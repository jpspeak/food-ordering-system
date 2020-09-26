import React from "react";

import NavBar from "../../NavBar";
import Carousel from "./Carousel";

import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    const classes = useStyles();
    return (
        <>
            <NavBar withBasket />
            <Container maxWidth="lg" className={classes.clearPaddingOnSm}>
                <Carousel />
                <Grid
                    container
                    className="p-1"
                    // style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
                >
                    <Grid item xs={6}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={`${classes.img} hover-design`}
                                />
                            </Box>
                            <Typography
                                className={`${classes.categoryName} ${classes.categoryNameResponsive}`}
                            >
                                All products
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={`${classes.img} hover-design`}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={`${classes.img} hover-design`}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={`${classes.img} hover-design`}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
