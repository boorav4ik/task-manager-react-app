import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginPost } from "../../api";
import { setUserIsLogin } from "../../app/reduxe/actions";
import {
    checkAuthUsername,
    saveAuthData,
} from "../../utils/functions/localstoreFunctions";

const Index = ({ history }) => {
    const { userIsLogin, currentPageUrl } = useSelector((state) => ({
        userIsLogin: state.userIsLogin,
        currentPageUrl: state.currentPageUrl,
    }));
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const username = checkAuthUsername();
        if (username) {
            setUsername(username);
        }
        dispatch(setUserIsLogin(Boolean(username)));
    }, [dispatch]);

    const onLoginClick = async () => {
        const loginResponse = await loginPost(username, password);
        if (
            loginResponse.status === 200 &&
            loginResponse.data.status === "ok"
        ) {
            saveAuthData(username, loginResponse.data.message.token);
            dispatch(setUserIsLogin(true));
            setError(false);
        } else {
            setError(true);
        }
    };

    const handleRedirectToMain = () => history.push(currentPageUrl);

    const onLogoutClick = () => {
        dispatch(setUserIsLogin(false));
        localStorage.removeItem("token");
        localStorage.removeItem("authData");
    };

    const handleChangeLogin = (event) => setUsername(event.target.value);
    const handleChangePassword = (event) => setPassword(event.target.value);

    return (
        <Stack
            style={{ width: "100%", height: "90vh" }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
        >
            {userIsLogin ? (
                <>
                    <Typography>
                        {`You are logged in as ${username}.`}
                    </Typography>
                    <Button variant="outlined" onClick={handleRedirectToMain}>
                        Go back to the Task Page
                    </Button>
                    <Button variant="contained" onClick={onLogoutClick}>
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Typography>Please log in:</Typography>
                    <TextField
                        key="username"
                        label="Username"
                        onChange={handleChangeLogin}
                        error={error}
                    />
                    <TextField
                        key="password"
                        type="password"
                        label="Password"
                        onChange={handleChangePassword}
                        error={error}
                    />
                    {error && (
                        <Typography color="error">
                            The data is incorrect
                        </Typography>
                    )}
                    <Stack direction="row" spacing={2}>
                        <Button onClick={onLoginClick} variant="outlined">
                            Login
                        </Button>
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={handleRedirectToMain}
                        >
                            Cansel
                        </Button>
                    </Stack>
                </>
            )}
        </Stack>
    );
};

export default Index;
