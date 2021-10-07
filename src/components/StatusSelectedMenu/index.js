import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

const options = {
    0: "Task not completed",
    1: "Task not completed, edited by admin",
    10: "Mission accomplished",
    11: "The task was edited by the admin and completed",
};

const useStyles = makeStyles({
    ExpandMoreIcon: {
        fontSize: "large",
    },
    statusMenuItem: {
        display: "block",
    },
    div: ({ isEditingEnabled }) => ({
        cursor: isEditingEnabled ? "arrow" : "pointer",
        marginLeft: "auto",
    }),
});

const CustomMenu = withStyles({
    paper: {
        border: "2px solid rgba(49, 54, 65, 1)",
        "& .MuiList-root": {
            padding: 0,
        },
    },
})((props) => (
    <Menu
        elevation={0}
        getvontentanchorel={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "left",
        }}
        {...props}
    />
));

const Index = ({ value, onChange, isEditingEnabled }) => {
    const classes = useStyles({ isEditingEnabled });
    const [anchorElement, setAnchorElement] = useState(null);
    const menuOpen = ({ currentTarget }) => {
        setAnchorElement(currentTarget);
    };
    const open = Boolean(anchorElement);

    const onMenuItemClick = (index) => {
        setAnchorElement(null);
        onChange(index);
    };

    const menuClose = () => setAnchorElement(null);

    return (
        <>
            <div>
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={isEditingEnabled ? menuOpen : () => {}}
                    endIcon={isEditingEnabled ? <ExpandMore /> : undefined}
                >
                    {`Status: ${options[value]}`}
                </Button>
                {isEditingEnabled && (
                    <CustomMenu
                        id="basic-menu"
                        anchorEl={anchorElement}
                        open={open}
                        onClose={menuClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        {Object.keys(options).map((key) => (
                            <MenuItem
                                key={key}
                                className={classes.statusMenuItem}
                                selected={key === value}
                                onClick={() => onMenuItemClick(key)}
                            >
                                {options[key]}
                            </MenuItem>
                        ))}
                    </CustomMenu>
                )}
            </div>
        </>
    );
};
Index.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    isEditingEnabled: PropTypes.bool,
};
export default Index;
