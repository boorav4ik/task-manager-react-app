import { Stack } from "@mui/material";
import React from "react";
import RadioButtons from "../RadioButtonsGroup";
import AddNewTaskGroup from "../AddNewTaskGroup";

const Index = ({
    sortField,
    sortDirection,
    handleChange,
    handleCreateTask,
}) => {
    return (
        <Stack
            spacing={1}
            justifyContent="space-between"
            style={{ height: "100%", minWidth: 300 }}
        >
            <RadioButtons
                label="Sort Field"
                options={["username", "email", "status"]}
                value={sortField}
                onChange={(value) => handleChange({ sortField: value })}
            />
            <RadioButtons
                label="Sort Directions"
                options={["asc", "desc"]}
                value={sortDirection}
                onChange={(value) => handleChange({ sortDirection: value })}
            />
            <AddNewTaskGroup onSubmitClick={handleCreateTask} />
        </Stack>
    );
};

export default Index;
