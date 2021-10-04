import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TextFieldGroup from "../TextFieldGroup";

const textFieldList = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password" },
];

const LoginForm = ({ onLoginClick, onToMainClick }) => {
    const [data, setData] = useState({});
    const [errorList, setErrorList] = useState({});
    const handleChange = ({ target }) =>
        setData({ ...data, [target.name]: target.value });

    return (
        <>
            <Typography>Please log in:</Typography>

            <Stack
                spacing={1}
                justifyContent="space-between"
                style={{ width: "310px" }}
            >
                <TextFieldGroup
                    fieldList={textFieldList}
                    onChange={handleChange}
                    errorList={errorList}
                />
            </Stack>
            <Stack direction="row" spacing={2}>
                <Button
                    onClick={async () => setErrorList(await onLoginClick(data))}
                    variant="outlined"
                >
                    Login
                </Button>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={onToMainClick}
                >
                    Cansel
                </Button>
            </Stack>
        </>
    );
};

LoginForm.propTypes = {
    onToMainClick: PropTypes.func,
    onLoginClick: PropTypes.func,
};

const LogoutForm = ({ username, onLogoutClick, onToMainClick }) => (
    <>
        <Typography>{`You are logged in as ${username}.`}</Typography>
        <Button variant="outlined" onClick={onToMainClick}>
            Go back to the Task Page
        </Button>
        <Button variant="contained" onClick={onLogoutClick}>
            Logout
        </Button>
    </>
);

LogoutForm.propTypes = {
    username: PropTypes.string,
    onToMainClick: PropTypes.func,
    onLogoutClick: PropTypes.func,
};

const Index = ({ userData, onToMainClick, onLogoutClick, onLoginClick }) => {
    return (
        <Stack
            style={{ width: "100%", height: "90vh" }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
        >
            {userData.username ? (
                <LogoutForm
                    username={userData.username}
                    onLogoutClick={onLogoutClick}
                    onToMainClick={onToMainClick}
                />
            ) : (
                <LoginForm
                    onLoginClick={onLoginClick}
                    onToMainClick={onToMainClick}
                />
            )}
        </Stack>
    );
};

Index.propTypes = {
    userData: PropTypes.object,
    onToMainClick: PropTypes.func,
    onLogoutClick: PropTypes.func,
    onLoginClick: PropTypes.func,
};

export default Index;
