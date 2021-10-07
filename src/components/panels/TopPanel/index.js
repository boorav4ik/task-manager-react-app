import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    topPanelStack: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    topPanelLoginStack: {
        flesDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    topPanelButton: {
        // margin: 3,
    },
});

const Index = ({ currentPage, username, handleLogout }) => {
    const classes = useStyles();
    return (
        <Stack className={classes.topPanelStack}>
            <Button
                classname={classes.topPanelButton}
                variant="outlined"
                component={Link}
                to={`/?page=${currentPage}`}
            >
                Tasks
            </Button>
            {username ? (
                <Stack spacing={2} className={classes.topPanelLoginStack}>
                    <Typography>Hello, {username}!</Typography>
                    <Button
                        classname={classes.topPanelButton}
                        onClick={handleLogout}
                        variant="outlined"
                    >
                        Logout
                    </Button>
                </Stack>
            ) : (
                <Button
                    classname={classes.topPanelButton}
                    component={Link}
                    to="/login"
                    variant="outlined"
                >
                    Login
                </Button>
            )}
        </Stack>
    );
};
Index.propTypes = {
    currentPage: PropTypes.string,
    username: PropTypes.string,
    handleLogout: PropTypes.func,
};

export default Index;
