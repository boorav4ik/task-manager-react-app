import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

const Index = ({ totalPageCount, curentPage, onPageChange }) => (
    <Stack spacing={2} justifyContent="space-around">
        <Pagination
            count={totalPageCount}
            // defaultPage={curentPage}
            page={curentPage}
            shape="rounded"
            onChange={(event, value) => onPageChange(value)}
        />
    </Stack>
);

Index.propTypes = {
    totalPageCount: PropTypes.number,
    curentPage: PropTypes.number,
    onPageChange: () => {},
};

export default Index;
