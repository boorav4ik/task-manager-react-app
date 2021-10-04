import { Stack } from "@mui/material";
import React from "react";
import ContentViewItem from "../ContentViewItem";
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

export default Index;
