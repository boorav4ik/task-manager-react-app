import React from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const Index = ({ fieldList, onChange, errorList }) =>
    fieldList.map(({ name, ...props }) => (
        <TextField
            key={name}
            name={name}
            {...props}
            error={Boolean(errorList[name])}
            onChange={onChange}
            helperText={errorList[name] ?? " "}
        />
    ));

Index.propTypes = {
    fieldList: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    errorList: PropTypes.arrayOf(PropTypes.object),
};

export default Index;
