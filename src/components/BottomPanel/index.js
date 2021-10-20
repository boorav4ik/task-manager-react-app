import React from "react";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    pagination: {
        marginBottom: "1rem",
        "& > ul": {
            justifyContent: "center",
        },
    },
});

const Index = ({ totalPageCount, curentPage, onPageChange }) => {
    const classes = useStyles();
    return (
        <Pagination
            className={classes.pagination}
            count={totalPageCount}
            size="large"
            page={curentPage}
            shape="rounded"
            onChange={(event, value) => onPageChange(value)}
            showFirstButton
            showLastButton
        />
    );
};

Index.propTypes = {
    totalPageCount: PropTypes.number,
    curentPage: PropTypes.number,
    onPageChange: () => {},
};

export default Index;
