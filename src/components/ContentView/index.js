import { Stack } from "@mui/material";
import React from "react";
import ContentViewItem from "../ContentViewItem";
import PropTypes from "prop-types";

const Index = ({ tasks, ...itemProps }) => (
    <Stack
        justifyContent="flex-start"
        spacing={6}
        style={{
            width: 1000,
            height: "100%",
        }}
    >
        {tasks.map((item) => (
            <ContentViewItem key={item.id} data={item} {...itemProps} />
        ))}
    </Stack>
);

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
