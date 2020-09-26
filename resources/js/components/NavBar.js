import React from "react";

import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Badge
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    backButton: {
        flexGrow: 1
    },
    drawerWidth: {
        width: 250,
        maxWidth: "80vw"
    },
    clearPaddingOnSm: {
        [theme.breakpoints.down("sm")]: {
            padding: 0
        }
    }
}));

export default function NavBar({ useBackButton, withBasket }) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = open => {
        setDrawerOpen(open);
    };
    const list = () => (
        <div>
            <List className={classes.drawerWidth}>
                <ListItem button>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="test" />
                </ListItem>
            </List>
        </div>
    );
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container maxWidth="lg" className={classes.clearPaddingOnSm}>
                    <Toolbar>
                        {useBackButton ? (
                            <Box className={classes.backButton}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    // onClick={() => toggleDrawer(true)}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={() => toggleDrawer(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Drawer
                                    open={drawerOpen}
                                    onClose={() => toggleDrawer(false)}
                                >
                                    {list()}
                                </Drawer>
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    Logo
                                </Typography>
                            </>
                        )}
                        {withBasket && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <Badge badgeContent={8} color="secondary">
                                    <ShoppingBasketIcon />
                                </Badge>
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
