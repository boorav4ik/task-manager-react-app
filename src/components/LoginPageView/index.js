import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    loginPageViewStack: { width: "100%", height: "90vh" },
});

const Index = ({
    userData,
    currentPageUrl,
    handleLogout,
    handleLogin,
    message,
}) => {
    const classes = useStyles();
    return (
        <Stack
            className={classes.loginPageViewStack}
            spacing={4}
            justifyContent="center"
            alignItems="center"
        >
            {userData.username ? (
                <>
                    <Typography>{`You are logged in as ${userData.username}.`}</Typography>
                    <Button
                        component={Link}
                        to={`/?page=${currentPageUrl}`}
                        variant="outlined"
                    >
                        Go back to the Task Page
                    </Button>
                    <Button variant="contained" onClick={handleLogout}>
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Typography {...message} />
                    <LoginForm handleLogin={handleLogin} />
                </>
            )}
        </Stack>
    );
};

Index.propTypes = {
    userData: PropTypes.object,
    currentPageUrl: PropTypes.string,
    handleLogout: PropTypes.func,
    handleLogin: PropTypes.func,
    message: PropTypes.shape({
        color: PropTypes.string,
        children: PropTypes.string,
    }),
};

export default Index;
