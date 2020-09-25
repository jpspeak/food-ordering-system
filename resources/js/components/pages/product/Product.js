import React from "react";
import NavBar from "../../NavBar";
import QuantiyCounter from "./QuantityCounter";

import { Grid, Box, Container, Typography, Button } from "@material-ui/core";
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
    },
    productDetails: {
        flex: 1
    }
}));
const Product = () => {
    const classes = useStyles();
    return (
        <>
            <NavBar useBackButton />
            <Container maxWidth="md" className={classes.clearPaddingOnSm}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.imgSubContainer}>
                                <img
                                    src="/storage/home/category_images/all-products.jpg"
                                    className={classes.img}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" className="p-2">
                            <Box className={classes.productDetails}>
                                <Typography>Hotdog</Typography>
                                <Typography className="font-weight-bold">
                                    ₱ 12
                                </Typography>
                            </Box>

                            <QuantiyCounter />
                        </Box>
                        <Box className="p-2 mt-5">
                            <Button
                                variant="contained"
                                className="w-100"
                                color="secondary"
                            >
                                add to bag
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Product;
