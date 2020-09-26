import React, { useContext, useEffect } from "react";

import { UserContext } from "./contexts/user/UserContext";

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
import LockIcon from "@material-ui/icons/Lock";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import { useHistory } from "react-router-dom";

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
    const userContext = useContext(UserContext);
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const classes = useStyles();

    const toggleDrawer = open => {
        setDrawerOpen(open);
    };

    const logout = () => {
        axios({
            method: "POST",
            url: "/api/auth/logout",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(() => {
                localStorage.removeItem("userToken");
                userContext.dispatch({ type: "DELETE_USER" });
            })
            .catch(err => {});
    };

    const list = () => (
        <div>
            <List className={classes.drawerWidth}>
                {userContext.data.user === undefined ? (
                    <ListItem
                        button
                        onClick={() => {
                            history.push("/login");
                        }}
                    >
                        <ListItemIcon>
                            <LockIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                ) : (
                    <>
                        <ListItem button onClick={() => {}}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={userContext.data.user.name}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                history.push("/order-history");
                            }}
                        >
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Order history" />
                        </ListItem>
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <PowerSettingsNewIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItem>
                    </>
                )}
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
                                    onClick={() => history.goBack()}
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
