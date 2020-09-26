import React from "react";
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
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        Sep 20, 2020 5pm
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className="w-100">
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Typography variant="h6">
                                    Order No.: 45Xlst
                                </Typography>
                            </Box>

                            <Typography className="text-right ">QTY</Typography>
                        </Box>
                        <Divider />
                        <Box display="flex" className="py-2">
                            <Box flexGrow={1}>
                                <Typography color="primary">
                                    Strawberry madafaking shake
                                </Typography>
                            </Box>
                            <Typography color="primary">3</Typography>
                        </Box>
                        <Divider />
                        <Box display="flex" className="py-2">
                            <Box flexGrow={1}>
                                <Typography color="primary">
                                    Strawberry madafaking shake
                                </Typography>
                            </Box>
                            <Typography color="primary">3</Typography>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>
                        Accordion 2
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
