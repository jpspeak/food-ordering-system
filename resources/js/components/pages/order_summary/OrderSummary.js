import React from "react";
import NavBar from "../../NavBar";
import OrderItem from "./OrderItem";

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
const OrderSummary = () => {
    const classes = useStyles();
    return (
        <>
            <NavBar useBackButton />
            <Container maxWidth="md" className={classes.clearPaddingOnSm}>
                <Typography className="font-weight-bold p-2" color="primary">
                    Order Summary
                </Typography>
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <Paper square className="p-2 m-2">
                    <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        className="p-2 my-2"
                    />
                    <Box display="flex" className="py-2">
                        <Box flexGrow={1}>
                            <Typography>Subtotal</Typography>
                        </Box>
                        <Typography className="font-weight-bold">
                            ₱ 202
                        </Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" className="py-2">
                        <Box flexGrow={1}>
                            <Typography>TOTAL</Typography>
                        </Box>
                        <Typography className="font-weight-bold">
                            ₱ 202
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className="w-100"
                    >
                        place order
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default OrderSummary;
