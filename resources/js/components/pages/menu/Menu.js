import React, { useEffect, useContext } from "react";

import { ProductsContext } from "../../contexts/products/ProductsContext";

import NavBar from "../../NavBar";
import SearchBar from "../../SearchBar";
import CategoryNav from "./CategoryNav";

import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useLocation, useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    clearPaddingOnSm: {
        [theme.breakpoints.down("sm")]: {
            padding: 0
        }
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
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
    const productsContext = useContext(ProductsContext);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const loadMenu = () => {
        axios({
            method: "GET",
            url: `/api/menu${location.search}`
        }).then(({ data }) => {
            productsContext.dispatch({
                type: "UPDATE_PRODUCTS",
                payload: data
            });
        });
    };
    useEffect(() => {
        loadMenu();
    }, []);
    return (
        <>
            <NavBar withBasket />
            <Container maxWidth="lg" className={classes.clearPaddingOnSm}>
                <SearchBar />
                <CategoryNav />
                <Grid container className="p-2">
                    {productsContext.data.products.map(product => (
                        <Grid
                            item
                            xs={4}
                            sm={3}
                            key={product.id}
                            onClick={() => {
                                history.push(`/products/${product.id}`);
                            }}
                        >
                            <Box className={classes.imgContainer}>
                                <Box className={classes.imgSubContainer}>
                                    <img
                                        src={product.image}
                                        className={classes.img}
                                    />
                                </Box>
                            </Box>
                            <Box className="text-center">
                                <Typography
                                    variant="caption"
                                    className="px-2 d-block"
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    className="px-2 d-block"
                                >
                                    ₱ {product.price}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Menu;
