import React from "react";
import {
    Paper,
    Grid,
    Avatar,
    Typography,
    makeStyles,
    Button,
    AppBar,
    Box,
    Modal
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
const styles = {
    container: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        whiteSpace: "nowrap",
        outline: "none",
        color: "#fff",
        width: "90%",
        maxWidth: 400
    },
    basketIcon: {
        fontSize: 72
    }
};
const AddMoreCheckoutModal = ({ open }) => {
    return (
        <>
            <Modal open={true}>
                <Paper className="p-4" style={styles.container}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ShoppingBasketIcon
                            style={styles.basketIcon}
                            className="my-2"
                        />
                        <Typography className="my-3">Added to bag!</Typography>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className="w-100 mb-3"
                        >
                            add more products
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            className="w-100"
                        >
                            proceed to checkout
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default AddMoreCheckoutModal;
