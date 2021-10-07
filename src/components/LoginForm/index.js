import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import TextFieldGroup from "../TextFieldGroup";
import PropTypes from "prop-types";

const textFieldList = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password" },
];

const Index = ({ handleLogin }) => {
    const [data, setData] = useState({});
    const [errorList, setErrorList] = useState({});

    const handleChange = ({ target }) =>
        setData({ ...data, [target.name]: target.value });

    return (
        <>
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
                    onClick={async () => setErrorList(await handleLogin(data))}
                    variant="outlined"
                    content="Login"
                >
                    Login
                </Button>
            </Stack>
        </>
    );
};

Index.propTypes = {
    handleLogin: PropTypes.func,
};

export default Index;
