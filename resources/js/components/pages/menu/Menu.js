import React from "react";

import NavBar from "../../NavBar";
import SearchBar from "../../SearchBar";
import CategoryNav from "./CategoryNav";

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
        padding: theme.spacing(1)
    }
}));

const Menu = () => {
    const classes = useStyles();
    return (
        <>
            <NavBar withBasket />
            <Container maxWidth="lg" className={classes.clearPaddingOnSm}>
                <SearchBar />
                <CategoryNav />
                <Grid container className="p-2">
                    <Grid item xs={4} sm={3}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={classes.img}
                                />
                            </Box>
                        </Box>
                        <Box className="text-center">
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                Spicy fugkal chicken
                            </Typography>
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                ₱12
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4} sm={3}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={classes.img}
                                />
                            </Box>
                        </Box>
                        <Box className="text-center">
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                Spicy fugkal chicken
                            </Typography>
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                ₱12
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4} sm={3}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={classes.img}
                                />
                            </Box>
                        </Box>
                        <Box className="text-center">
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                Spicy fugkal chicken
                            </Typography>
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                ₱12
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4} sm={3}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={classes.img}
                                />
                            </Box>
                        </Box>
                        <Box className="text-center">
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                Spicy fugkal chicken
                            </Typography>
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                ₱12
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={classes.img}
                                />
                            </Box>
                        </Box>
                        <Box className="text-center">
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                Spicy fugkal chicken
                            </Typography>
                            <Typography
                                variant="caption"
                                className="px-2 d-block"
                            >
                                ₱12
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Menu;
