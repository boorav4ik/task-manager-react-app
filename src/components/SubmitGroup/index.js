import { Button } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../TextFieldGroup";

const Index = ({ onSubmitClick, fieldList, className, children }) => {
    const [errorList, setErrorList] = useState({});
    const [taskObject, setTaskObject] = useState({});

    const handleChange = ({ target }) =>
        setTaskObject({ ...taskObject, [target.name]: target.value });

    const onSubmit = async () => setErrorList(await onSubmitClick(taskObject));

    return (
        <div className={"flex-column content-space-between " + className ?? ""}>
            <TextFieldGroup
                fieldList={fieldList}
                onChange={handleChange}
                errorList={errorList}
            />
            <Button variant="contained" onClick={onSubmit}>
                {children}
            </Button>
        </div>
    );
};

Index.propTypes = {
    onSubmitClick: PropTypes.func,
    fieldList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            label: PropTypes.string,
            row: PropTypes.number,
            multiline: PropTypes.bool,
        })
    ),
    children: PropTypes.string,
    className: PropTypes.string,
};

export default Index;
