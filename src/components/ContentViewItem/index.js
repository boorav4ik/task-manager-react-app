import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@mui/material";
import StatusSelectedMenu from "../StatusSelectedMenu";
import { Fab, Typography } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import { Check } from "@material-ui/icons";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    noBorder: {
        border: "none",
    },
    marginLeftAuto: {
        marginLeft: "auto",
    },
});

const Index = ({ data, userIsLogin, handleEditTask }) => {
    const [text, setText] = useState(data.text);
    const [taskStatus, setTaskStatus] = useState(data.status);
    const classes = useStyles();
    const [isEditingEnabled, setIsEditingEnabled] = useState(false);

    return (
        <dir className="p-1 flex-column task-box">
            <dir>
                <Typography>{`USERNAME: ${data.username} E-MAIL: ${data.email}`}</Typography>
            </dir>
            {isEditingEnabled ? (
                <TextField
                    variant={"outlined"}
                    fullWidth
                    defaultValue={data.text}
                    onChange={(event) => setText(event.target.value)}
                />
            ) : (
                <Typography>{data.text}</Typography>
            )}

            <dir className="flex-row">
                <StatusSelectedMenu
                    value={taskStatus}
                    onChange={(index) => setTaskStatus(index)}
                    isEditingEnabled={isEditingEnabled}
                />
                {userIsLogin && (
                    <Fab
                        className={classes.marginLeftAuto}
                        size="small"
                        onClick={() => {
                            if (isEditingEnabled) {
                                handleEditTask({
                                    id: data.id,
                                    text,
                                    taskStatus,
                                });
                            }
                            setIsEditingEnabled(!isEditingEnabled);
                        }}
                    >
                        {isEditingEnabled ? <Check /> : <Edit />}
                    </Fab>
                )}
            </dir>
        </dir>
    );
};

Index.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        email: PropTypes.string,
        status: PropTypes.number,
        text: PropTypes.string,
    }),
    userIsLogin: PropTypes.bool,
    handleEditTask: PropTypes.func,
};
export default Index;
