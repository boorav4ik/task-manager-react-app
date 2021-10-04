import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Index = ({ label, options, value, onChange }) => (
    <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
            row
            value={value}
            onChange={(event, value) => onChange(value)}
        >
            {options.map((item) => (
                <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={item}
                />
            ))}
        </RadioGroup>
    </FormControl>
);

export default Index;
