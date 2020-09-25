import React from "react";

import { Box, ButtonBase, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        height: "100%",
        width: 50,
        fontWeight: "bold"
    },
    input: {
        border: "none",
        height: 50,
        width: 50,
        textAlign: "center"
    },
    container: {
        border: `2px solid ${theme.palette.primary.main}`
    }
}));
const QuantityCounter = () => {
    const classes = useStyles();
    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                className={classes.container}
            >
                <ButtonBase variant="contained" className={classes.button}>
                    <RemoveIcon />
                </ButtonBase>
                <input
                    type="number"
                    className={classes.input}
                    disabled
                    value={1}
                />
                <ButtonBase variant="contained" className={classes.button}>
                    <AddIcon />
                </ButtonBase>
            </Box>
        </>
    );
};

export default QuantityCounter;
