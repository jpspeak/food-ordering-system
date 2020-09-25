import React from "react";

import { Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    input: {
        border: `1px solid ${theme.palette.primary.main} `,
        width: "100%",
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(6),
        borderRadius: theme.spacing(6)
    }
}));
const SearchBar = () => {
    const classes = useStyles();
    return (
        <>
            <Box className="m-2" style={{ position: "relative" }}>
                <Box
                    className="py-2 px-3"
                    style={{ position: "absolute", left: 0, top: 0 }}
                >
                    <SearchIcon color="primary" />
                </Box>
                <input
                    type="text"
                    placeholder="Search here.."
                    className={classes.input}
                />
            </Box>
        </>
    );
};

export default SearchBar;
