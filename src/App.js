import React, { useEffect } from "react";
import { setUserData } from "./reduxe/actions";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { getSessionUsername } from "./utils/functions/localstoreFunctions";
import { Stack } from "@mui/material";
import TopPanelControl from "./containers/TopPanelControl";
import LoginPage from "./containers/pages/LoginPage";
import TasksPage from "./containers/pages/TasksPage";

const defaultTasksPage = {
    pathname: "/tasks",
    search: "?sort_field=username&sort_direction=asc&page=1",
};

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setUserData({ username: getSessionUsername() }));
    }, [dispatch]);

    return (
        <Stack>
            <TopPanelControl />
            <Switch>
                <Route path="/tasks" component={TasksPage} />
                <Route exact path="/">
                    <Redirect to={defaultTasksPage} />
                </Route>
                <Route path="/login" component={LoginPage} />
            </Switch>
        </Stack>
    );
}

export default App;
