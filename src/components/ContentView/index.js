import { Stack } from "@mui/material";
import React from "react";
import ContentViewItem from "../ContentViewItem";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    contentViewStack: {
        minWidth: 800,
        height: "100%",
    },
});

const Index = ({ tasks, ...itemProps }) => {
    const classes = useStyles();

    return (
        <Stack
            justifyContent="flex-start"
            spacing={6}
            className={classes.contentViewStack}
        >
            {tasks.map((item) => (
                <ContentViewItem key={item.id} data={item} {...itemProps} />
            ))}
        </Stack>
    );
};

Index.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            email: PropTypes.string,
            status: PropTypes.number,
            text: PropTypes.string,
        })
    ),
};

export default Index;
