import React, { useEffect, useState } from "react";
import RightPanel from "../../components/RightPanel";
import ContentView from "../../components/ContentView";
import BottomPanel from "../../components/BottomPanel";
import { Stack } from "@mui/material";
import { createPost, editPost, getTasksAndPages } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPageURL } from "../../reduxe/actions";
import escapeHtml from "../../utils/functions/escapeHtml";
import PropTypes from "prop-types";

function getSearchParams(locationSearch) {
    const searchParams = new URLSearchParams(locationSearch);
    const page = parseInt(searchParams.get("page"));
    const sortDirection = searchParams.get("sort_direction");
    const sortField = searchParams.get("sort_field");
    return { page, sortDirection, sortField };
}

function createSearchParamsString(newParams, oldParams) {
    const searchParams = new URLSearchParams();
    searchParams.append(
        "sort_field",
        newParams.sortField ?? oldParams.sortField
    );
    searchParams.append(
        "sort_direction",
        newParams.sortDirection ?? oldParams.sortDirection
    );
    searchParams.append("page", newParams.page ?? oldParams.page);
    return `?${searchParams.toString()}`;
}

const Index = ({ history, location }) => {
    const userIsLogin = useSelector((state) => state.userIsLogin);
    const [tasks, setTasks] = useState([]);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const dispatch = useDispatch();
    const searchParams = getSearchParams(location.search);

    async function uploadData() {
        const { tasks, totalPageCount } = await getTasksAndPages(
            location.search
        );
        setTasks(tasks);
        setTotalPageCount(totalPageCount);
    }

    async function handleCreateTask({ username = "", email = "", text = "" }) {
        const createResponse = await createPost({
            username,
            email,
            text: escapeHtml(text),
        });
        if (createResponse.data.status === "error") {
            return createResponse.data.message;
        } else {
            uploadData(searchParams);
            return {};
        }
    }

    const handleChangeSearchParams = (params) => {
        const curentPageUrl =
            location.pathname + createSearchParamsString(params, searchParams);
        dispatch(setCurrentPageURL(curentPageUrl));
        history.push(curentPageUrl);
    };

    const handleEditTask = (data) =>
        editPost({ ...data, text: escapeHtml(data.text) });

    useEffect(() => {
        uploadData();
    }, [location.search]);

    return (
        <Stack
            style={{ width: "100vw", height: "90vh" }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                    width: 800,
                    height: "70%",
                    marginLeft: "10%",
                }}
                spacing={4}
            >
                <ContentView
                    tasks={tasks}
                    userIsLogin={userIsLogin}
                    handleEditTask={handleEditTask}
                />
                <RightPanel
                    sortDirection={searchParams.sortDirection}
                    sortField={searchParams.sortField}
                    handleChange={handleChangeSearchParams}
                    handleCreateTask={handleCreateTask}
                />
            </Stack>
            <BottomPanel
                totalPageCount={totalPageCount}
                curentPage={searchParams.page}
                onPageChange={(page) =>
                    handleChangeSearchParams({ page: page })
                }
            />
        </Stack>
    );
};

Index.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

Index.defaultProps = {
    history: {},
    location: {},
};

export default Index;
