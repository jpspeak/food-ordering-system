import React, { useState, useEffect, useContext } from "react";

import { OrderSummaryContext } from "../../contexts/order_summary/OrderSummaryContext";
import { OrderCountContext } from "../../contexts/order_summary/OrderCountContext";

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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/Clear";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    clearPaddingOnSm: {
        [theme.breakpoints.down("sm")]: {
            padding: 0
        }
    },
    invalid: {
        border: "1px solid red"
    }
}));
const OrderSummary = () => {
    const orderSummaryContext = useContext(OrderSummaryContext);
    const orderCountContext = useContext(OrderCountContext);
    const history = useHistory();
    const [invalidCoupon, setInvalidCoupon] = useState();
    const classes = useStyles();
    const loadOrderSummary = () => {
        axios({
            method: "GET",
            url: `/api/order-summary`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }).then(({ data }) => {
            orderSummaryContext.dispatch({
                type: "UPDATE_ORDER_SUMMARY",
                payload: data
            });
        });
    };
    const checkCoupon = e => {
        const code = e.target.value;
        axios({
            method: "POST",
            url: `/api/coupons/check`,
            data: {
                code: code
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(({ data }) => {
                setInvalidCoupon(false);

                orderSummaryContext.dispatch({
                    type: "UPDATE_ORDER_SUMMARY",
                    payload: data
                });
            })
            .catch(err => {
                setInvalidCoupon(true);
            });
    };
    const placeOrder = () => {
        const orderSummary = orderSummaryContext.data.orderSummary;
        axios({
            method: "POST",
            url: `/api/place-order`,
            data: {
                coupon: orderSummary.coupon
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }).then(({ data }) => {
            orderCountContext.dispatch({
                type: "RESET_COUNT"
            });
            orderSummaryContext.dispatch({
                type: "DELETE_ORDER_SUMMARY"
            });
            history.replace("/menu?category=1");
        });
    };
    useEffect(() => {
        loadOrderSummary();
    }, []);
    return (
        <>
            <NavBar useBackButton />
            <Container maxWidth="md" className={classes.clearPaddingOnSm}>
                <Typography className="font-weight-bold p-2" color="primary">
                    Order Summary
                </Typography>
                {orderSummaryContext.data.orderSummary &&
                    orderSummaryContext.data.orderSummary.orderList.map(
                        item => <OrderItem key={item.id} data={item} />
                    )}

                <Paper square className="p-2 m-2">
                    <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        className={` p-2 my-2`}
                        disabled={invalidCoupon == false}
                        onChange={checkCoupon}
                    />
                    {invalidCoupon == undefined ? (
                        ""
                    ) : (
                        <>
                            {invalidCoupon && (
                                <Typography
                                    variant="caption"
                                    className=" mx-2 text-danger"
                                >
                                    Invalid coupon
                                </Typography>
                            )}
                            {!invalidCoupon && (
                                <CheckCircleIcon className="mx-2 text-success" />
                            )}
                        </>
                    )}

                    <Box display="flex" className="py-2">
                        <Box flexGrow={1}>
                            <Typography>Subtotal</Typography>
                        </Box>
                        <Typography className="font-weight-bold">
                            ₱{" "}
                            {orderSummaryContext.data.orderSummary &&
                                orderSummaryContext.data.orderSummary.subtotal}
                        </Typography>
                    </Box>
                    {orderSummaryContext.data.orderSummary &&
                        orderSummaryContext.data.orderSummary.coupon && (
                            <Box display="flex" className="py-2">
                                <Box flexGrow={1}>
                                    <Typography>
                                        {`${orderSummaryContext.data.orderSummary.coupon} (${orderSummaryContext.data.orderSummary.percentageOff}% off)`}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                    <Divider />
                    <Box display="flex" className="py-2">
                        <Box flexGrow={1}>
                            <Typography className="font-weight-bold">
                                TOTAL
                            </Typography>
                        </Box>
                        <Typography className="font-weight-bold">
                            ₱{" "}
                            {orderSummaryContext.data.orderSummary &&
                                orderSummaryContext.data.orderSummary.total}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className="w-100"
                        onClick={placeOrder}
                    >
                        place order
                    </Button>
                </Paper>
            </Container>
        </>
    );
};

export default OrderSummary;
