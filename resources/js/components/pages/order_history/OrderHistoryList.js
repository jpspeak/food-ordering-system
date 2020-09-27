import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

export default function OrderHistoryList() {
    const [orderHistory, setOrderHistory] = useState([]);
    const classes = useStyles();

    const loadOrderHistory = () => {
        axios({
            method: "GET",
            url: "/api/order-history",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }).then(({ data }) => {
            // console.log(data);
            setOrderHistory(data);
        });
    };
    useEffect(() => {
        loadOrderHistory();
    }, []);

    return (
        <div className={classes.root}>
            {orderHistory.map(item => (
                <Accordion key={item.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            {item.created_at}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box className="w-100">
                            <Box display="flex">
                                <Box flexGrow={1}>
                                    <Typography variant="h6">
                                        Order No.: {item.order_number}
                                    </Typography>
                                </Box>

                                <Typography className="text-right ">
                                    QTY
                                </Typography>
                            </Box>

                            {item.order_items.map(product => (
                                <>
                                    <Divider />
                                    <Box
                                        display="flex"
                                        className="py-2"
                                        key={product.id}
                                    >
                                        <Box flexGrow={1}>
                                            <Typography color="primary">
                                                {product.product.name}
                                            </Typography>
                                        </Box>
                                        <Typography color="primary">
                                            {product.quantity}
                                        </Typography>
                                    </Box>
                                </>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
