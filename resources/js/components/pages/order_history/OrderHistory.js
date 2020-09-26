import React from "react";
import NavBar from "../../NavBar";
import OrderHistoryList from "./OrderHistoryList";

import {
    Container,
    Typography,
    Paper,
    Box,
    Divider,
    Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    clearPaddingOnSm: {
        [theme.breakpoints.down("sm")]: {
            padding: 0
        }
    }
}));
const OrderHistory = () => {
    const classes = useStyles();
    return (
        <>
            <NavBar useBackButton />
            <Container maxWidth="lg" className={classes.clearPaddingOnSm}>
                <Typography className="font-weight-bold p-2" color="primary">
                    Order History
                </Typography>
                <Box className="p-2">
                    <OrderHistoryList />
                </Box>
            </Container>
        </>
    );
};

export default OrderHistory;
