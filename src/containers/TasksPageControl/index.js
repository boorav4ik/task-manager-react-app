import React, { useEffect, useState } from "react";
import RightPanel from "../../components/RightPanel";
import ContentView from "../../components/ContentView";
import BottomPanel from "../../components/BottomPanel";
import PropTypes from "prop-types";
import { createPost, editPost, getTasksAndPages } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPageURL, setUserData } from "../../reduxe/actions";
import escapeHtml from "../../utils/functions/escapeHtml";
import getSearchParams from "../../utils/functions/getSearchParams";
import createSearchParamsString from "../../utils/functions/createSearchParamsString";
import { clearSessionData } from "../../utils/functions/localstoreFunctions";

const ERROR = "error";

const Index = ({ history, location }) => {
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
        const currentPageUrl =
            location.pathname + createSearchParamsString(params, searchParams);
        dispatch(setCurrentPageURL(currentPageUrl));
        history.push(currentPageUrl);
    };

    const handleEditTask = async (data) => {
        const editResponse = await editPost({
            ...data,
            text: escapeHtml(data.text),
        });
        if (
            (editResponse.data.status =
                ERROR && editResponse.data.message?.token)
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
        <dir className="flex-row f-1">
            <dir className="flex-column f-1 content-space-between">
                <ContentView
                    tasks={tasks}
                    userIsLogin={Boolean(userData.username)}
                    handleEditTask={handleEditTask}
                />
                <BottomPanel
                    totalPageCount={totalPageCount}
                    curentPage={searchParams.page}
                    onPageChange={(page) => handleChangeSearchParams({ page })}
                />
            </dir>
            <RightPanel
                sortDirection={searchParams.sortDirection}
                sortField={searchParams.sortField}
                handleChange={handleChangeSearchParams}
                handleCreateTask={handleCreateTask}
            />
        </dir>
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
