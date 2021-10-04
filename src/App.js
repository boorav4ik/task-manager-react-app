import React, { useEffect } from "react";
import { setUserIsLogin } from "./reduxe/actions";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { checkAuthUsername } from "./utils/functions/localstoreFunctions";
import { Stack } from "@mui/material";
import TopPanelControl from "./containers/TopPanelControl";
import AdminLoginPage from "./pages/AdminLoginPage";
import TasksPage from "./pages/TasksPage";

const defaultTasksPage = {
    pathname: "/tasks",
    search: "?sort_field=username&sort_direction=asc&page=1",
};

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setUserIsLogin(Boolean(checkAuthUsername())));
    }, [dispatch]);

    return (
        <Stack>
            <TopPanelControl />
            <Switch>
                <Route path="/tasks" component={TasksPage} />
                <Route exact path="/">
                    <Redirect to={defaultTasksPage} />
                </Route>
                <Route path="/admin" component={AdminLoginPage} />
            </Switch>
        </Stack>
    );
}

export default App;
