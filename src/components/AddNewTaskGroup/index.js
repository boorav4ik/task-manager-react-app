import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
const textFieldsList = [
    { name: "username", label: "Name" },
    { name: "email", label: "E-mail" },
    { name: "text", label: "Task discription", rows: 4, multiline: true },
];

const Index = ({ onSubmitClick }) => {
    const [errorsList, setErrorList] = useState({});
    const [taskObject, setTaskObject] = useState({});

    const handleChange = ({ target }) =>
        setTaskObject({ ...taskObject, [target.name]: target.value });

    const onSubmit = async () => setErrorList(await onSubmitClick(taskObject));

    return (
        <Stack spacing={1} justifyContent="space-between">
            {textFieldsList.map(({ name, ...props }) => (
                <TextField
                    key={name}
                    name={name}
                    {...props}
                    error={Boolean(errorsList[name])}
                    onChange={handleChange}
                    helperText={errorsList[name] ?? " "}
                />
            ))}
            <Button variant="contained" onClick={onSubmit}>
                Sabmit
            </Button>
        </Stack>
    );
};

export default Index;
