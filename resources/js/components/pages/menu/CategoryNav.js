import React from "react";
import { Typography, Box, ButtonBase } from "@material-ui/core";

const CategoryNav = () => {
    return (
        <>
            <Box display="flex" justifyContent="center">
                <Box>
                    <ButtonBase className="p-2">All</ButtonBase>
                </Box>
                <Box>
                    <ButtonBase className="p-2">Burgers</ButtonBase>
                </Box>
                <Box>
                    <ButtonBase className="p-2">Beverages</ButtonBase>
                </Box>
                <Box>
                    <ButtonBase className="p-2">Combo Meals</ButtonBase>
                </Box>
            </Box>
        </>
    );
};

export default CategoryNav;
