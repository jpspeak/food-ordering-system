import React, { useState, useContext, useEffect } from "react";

import { ProductContext } from "../../contexts/products/ProductContext";
import { QuantityContext } from "../../contexts/products/QuantityContext";
import { OrderCountContext } from "../../contexts/order_summary/OrderCountContext";

import NavBar from "../../NavBar";
import QuantiyCounter from "./QuantityCounter";
import AddMoreCheckoutModal from "./AddMoreCheckoutModal";

import { Grid, Box, Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useParams, useHistory, useLocation } from "react-router-dom";
import { OrderSummaryContext } from "../../contexts/order_summary/OrderSummaryContext";

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
    },
    productDetails: {
        flex: 1
    }
}));
const Product = () => {
    const { productId } = useParams();
    const location = useLocation();
    const history = useHistory();
    const productContext = useContext(ProductContext);
    const orderCountContext = useContext(OrderCountContext);
    const quantityContext = useContext(QuantityContext);
    const [openModal, setOpenModal] = useState(false);
    const classes = useStyles();
    const addToBag = () => {
        axios({
            method: "POST",
            url: "/api/bag",
            data: {
                product_id: productId,
                quantity: quantityContext.data.quantity
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(({ data }) => {
                setOpenModal(true);
                console.log(data);
                orderCountContext.dispatch({
                    type: "LOAD_ORDER_COUNT",
                    payload: data
                });
            })
            .catch(err => {
                if (err.response.status == 401) {
                    history.push("/login");
                    history.push({
                        pathname: "/login",
                        state: { returnPath: location.pathname }
                    });
                }
            });
    };
    const loadProduct = () => {
        axios({
            method: "GET",
            url: `/api/products/${productId}`
        }).then(({ data }) => {
            productContext.dispatch({
                type: "UPDATE_PRODUCT",
                payload: data
            });
        });
    };
    useEffect(() => {
        loadProduct();
    }, []);

    return (
        <>
            <NavBar useBackButton withBasket />
            <Container maxWidth="lg" className={classes.clearPaddingOnSm}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src={
                                        productContext.data.product &&
                                        productContext.data.product.image
                                    }
                                    className={classes.img}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" className="p-2">
                            <Box className={classes.productDetails}>
                                <Typography>
                                    {productContext.data.product &&
                                        productContext.data.product.name}
                                </Typography>
                                <Typography className="font-weight-bold">
                                    ₱{" "}
                                    {productContext.data.product &&
                                        productContext.data.product.price *
                                            quantityContext.data.quantity}
                                </Typography>
                            </Box>

                            <QuantiyCounter />
                        </Box>
                        <Box className="p-2 mt-5">
                            <Button
                                size="large"
                                variant="contained"
                                className="w-100"
                                color="secondary"
                                onClick={addToBag}
                            >
                                add to bag
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <AddMoreCheckoutModal
                open={openModal}
                handleClose={() => {
                    setOpenModal(false);
                }}
            />
        </>
    );
};

export default Product;
