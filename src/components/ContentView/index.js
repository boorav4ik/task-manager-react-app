import React from "react";
import ContentViewItem from "../ContentViewItem";
import PropTypes from "prop-types";

const Index = ({ tasks, ...itemProps }) => (
    <dir className="flex-column f-1 p-1">
        {tasks.map((item) => (
            <ContentViewItem key={item.id} data={item} {...itemProps} />
        ))}
    </dir>
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
