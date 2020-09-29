import React, { useContext } from "react";

import { OrderSummaryContext } from "../../contexts/order_summary/OrderSummaryContext";
import { OrderCountContext } from "../../contexts/order_summary/OrderCountContext";

import { Typography, Paper, Box, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
const useStyles = makeStyles(theme => ({
    quantityButton: {
        height: 30,
        width: 30,
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    }
}));
const OrderSummary = ({ data }) => {
    const orderSummaryContext = useContext(OrderSummaryContext);
    const orderCountContext = useContext(OrderCountContext);
    const increment = () => {
        axios({
            method: "POST",
            url: `api/bag/${data.product_id}/increment`,
            data: {
                code: orderSummaryContext.data.orderSummary.coupon || ""
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(({ data }) => {
                orderSummaryContext.dispatch({
                    type: "UPDATE_ORDER_SUMMARY",
                    payload: data
                });
            })
            .catch(err => {});
    };
    const decrement = () => {
        axios({
            method: "POST",
            url: `api/bag/${data.product_id}/decrement`,
            data: {
                code: orderSummaryContext.data.orderSummary.coupon || ""
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(({ data }) => {
                console.log(data);
                orderSummaryContext.dispatch({
                    type: "UPDATE_ORDER_SUMMARY",
                    payload: data
                });

                orderCountContext.dispatch({
                    type: "LOAD_ORDER_COUNT",
                    payload: data.bag.length
                });
            })
            .catch(err => {});
    };

    const classes = useStyles();
    return (
        <>
            <Paper square className="p-2 m-2">
                <Box display="flex">
                    <img
                        src={data.product.image}
                        style={{
                            height: 100,
                            width: 100,
                            objectFit: "contain"
                        }}
                    />
                    <Box flexGrow={1}>
                        <Typography className="px-2">
                            {data.product.name}
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column">
                        <Box
                            display="flex"
                            flexGrow={1}
                            alignItems="flex-start"
                        >
                            <Box
                                display="flex"
                                flexGrow={1}
                                alignItems="center"
                            >
                                <ButtonBase
                                    className={classes.quantityButton}
                                    onClick={decrement}
                                >
                                    <RemoveIcon />
                                </ButtonBase>
                                <Typography variant="caption" className="px-2">
                                    {data.quantity}
                                </Typography>
                                <ButtonBase
                                    className={classes.quantityButton}
                                    onClick={increment}
                                >
                                    <AddIcon />
                                </ButtonBase>
                            </Box>
                        </Box>
                        <Box>
                            <Typography className="font-weight-bold text-right">
                                ₱ {data.total}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default OrderSummary;
