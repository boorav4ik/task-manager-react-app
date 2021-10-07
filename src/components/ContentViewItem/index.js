import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Stack } from "@mui/material";
import StatusSelectedMenu from "../StatusSelectedMenu";
import { Fab, Typography } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import { CheckCircle } from "@material-ui/icons";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    noBorder: {
        border: "none",
    },
    marginLeftAuto: {
        marginLeft: "auto",
    },
    contentViewItemStack: {
        border: "2px solid gray",
        padding: 4,
        borderRadius: 4,
        flexGrow: 1,
    },
});

const Index = ({ data, userIsLogin, handleEditTask }) => {
    const [text, setText] = useState(data.text);
    const [taskStatus, setTaskStatus] = useState(data.status);
    const classes = useStyles();
    const [isEditingEnabled, setIsEditingEnabled] = useState(false);
    return (
        <Stack className={classes.contentViewItemStack}>
            <Typography>{`USERNAME: ${data.username} E-MAIL: ${data.email}`}</Typography>
            <TextField
                variant="outlined"
                fullWidth
                defaultValue={data.text}
                InputProps={{
                    classes: { notchedOutline: classes.noBorder },
                    readOnly: !isEditingEnabled,
                }}
                onChange={(event) => setText(event.target.value)}
            />
            <Stack direction="row">
                <StatusSelectedMenu
                    value={data.status}
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
                        {isEditingEnabled ? <CheckCircle /> : <Edit />}
                    </Fab>
                )}
            </Stack>
        </Stack>
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
