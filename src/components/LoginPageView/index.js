import React from "react";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SubmitGroup from "../SubmitGroup";

const fieldList = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password" },
];

const Index = ({ userData, currentPageUrl, handleLogin, message }) => (
    <div className="flex-column f-1 content-center">
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
            </>
        ) : (
            <>
                <Typography {...message} />
                <SubmitGroup
                    onSubmitClick={handleLogin}
                    fieldList={fieldList}
                    className="login-form"
                >
                    Login
                </SubmitGroup>
            </>
        )}
    </div>
);

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
