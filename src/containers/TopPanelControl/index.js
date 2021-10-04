import { Button, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserIsLogin } from "../../app/reduxe/actions";
import { checkAuthUsername } from "../../utils/functions/localstoreFunctions";
// import { checkAuthUsername } from "../../utils/functions/localstoreFunctions";

const Index = () => {
    const { userIsLogin, currentPage } = useSelector((state) => ({
        userIsLogin: state.userIsLogin,
        currentPage: state.currentPage,
    }));
    const username = checkAuthUsername();
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <Stack
            style={{ width: "100%" }}
            justifyContent="center"
            direction="row"
            spacing={2}
        >
            <Button
                variant="outlined"
                onClick={() => history.push(`/?page=${currentPage}`)}
            >
                Tasks
            </Button>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
            >
                {userIsLogin && username && (
                    <Typography>Hello, {username}!</Typography>
                )}
                <Button
                    onClick={() => {
                        if (userIsLogin) {
                            dispatch(setUserIsLogin(false));
                            localStorage.removeItem("token");
                            localStorage.removeItem("authData");
                        } else {
                            history.push("/admin");
                        }
                    }}
                    variant="outlined"
                >
                    {userIsLogin ? "Logout" : "Login"}
                </Button>
            </Stack>
        </Stack>
    );
};

export default Index;
