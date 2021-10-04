import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../TextFieldGroup";

const textFieldList = [
    { name: "username", label: "Name" },
    { name: "email", label: "E-mail" },
    { name: "text", label: "Task discription", rows: 4, multiline: true },
];

const Index = ({ onSubmitClick }) => {
    const [errorList, setErrorList] = useState({});
    const [taskObject, setTaskObject] = useState({});

    const handleChange = ({ target }) =>
        setTaskObject({ ...taskObject, [target.name]: target.value });

    const onSubmit = async () => setErrorList(await onSubmitClick(taskObject));

    return (
        <Stack spacing={1} justifyContent="space-between">
            <TextFieldGroup
                fieldList={textFieldList}
                onChange={handleChange}
                errorList={errorList}
            />
            <Button variant="contained" onClick={onSubmit}>
                Sabmit
            </Button>
        </Stack>
    );
};

Index.propTypes = {
    onSubmitClick: PropTypes.func,
};

export default Index;
