import React, { useEffect, useState } from "react";
import RightPanel from "../../../components/RightPanel";
import ContentView from "../../../components/ContentView";
import BottomPanel from "../../../components/BottomPanel";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { createPost, editPost, getTasksAndPages } from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPageURL, setUserData } from "../../../reduxe/actions";
import escapeHtml from "../../../utils/functions/escapeHtml";
import getSearchParams from "../../../utils/functions/getSearchParams";
import createSearchParamsString from "../../../utils/functions/createSearchParamsString";
import { clearSessionData } from "../../../utils/functions/localstoreFunctions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    taskPageStack: {
        width: "100vw",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
    },
    taskConteiner: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "70%",
        marginLeft: "10%",
    },
});

const ERROR = "error";

const Index = ({ history, location }) => {
    const classes = useStyles();
    const userData = useSelector((state) => state.userData);
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

    const handleEditTask = async (data) => {
        const editResponse = await editPost({
            ...data,
            text: escapeHtml(data.text),
        });
        if (
            (editResponse.data.status =
                ERROR && editResponse.data.message.token)
        ) {
            clearSessionData();
            dispatch(setUserData({}));
            history.push("/login/0");
        } else {
            uploadData();
        }
    };

    useEffect(() => {
        uploadData();
    }, [location.search]);

    return (
        <Stack className={classes.taskPageStack} spacing={4}>
            <Stack className={classes.taskConteiner} spacing={4}>
                <ContentView
                    tasks={tasks}
                    userIsLogin={Boolean(userData.username)}
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
                onPageChange={(page) => handleChangeSearchParams({ page })}
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
