import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Index = ({ totalPageCount, curentPage, onPageChange }) => (
    <Stack spacing={2} justifyContent="space-around">
        <Pagination
            count={totalPageCount}
            defaultPage={curentPage}
            shape="rounded"
            onChange={(event, value) => onPageChange(value)}
        />
    </Stack>
);

export default Index;
