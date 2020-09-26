import React from "react";

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
const OrderSummary = () => {
    const classes = useStyles();
    return (
        <>
            <Paper square className="p-2 m-2">
                <Box display="flex">
                    <img
                        src="/storage/home/category_images/all-products.jpg"
                        style={{ height: 100, width: 100, objectFit: "cover" }}
                    />
                    <Box flexGrow={1}>
                        <Typography className="px-2">
                            Strawberry madafaking shake
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
                                <ButtonBase className={classes.quantityButton}>
                                    <RemoveIcon />
                                </ButtonBase>
                                <Typography variant="caption" className="px-2">
                                    1
                                </Typography>
                                <ButtonBase className={classes.quantityButton}>
                                    <AddIcon />
                                </ButtonBase>
                            </Box>
                        </Box>
                        <Box>
                            <Typography className="font-weight-bold text-right">
                                ₱ 190
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default OrderSummary;
