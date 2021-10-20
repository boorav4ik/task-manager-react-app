import React, { useEffect } from "react";
import { setUserData } from "./reduxe/actions";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { getSessionUsername } from "./utils/functions/localstoreFunctions";
import LeftPanelControl from "./containers/LeftPanelControl";
import LoginPageControl from "./containers/LoginPageControl";
import TasksPageControl from "./containers/TasksPageControl";

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
        <dir className="app">
            <LeftPanelControl />
            <Switch>
                <Route path="/tasks" component={TasksPageControl} />
                <Route exact path="/">
                    <Redirect to={defaultTasksPage} />
                </Route>
                <Route path="/login" component={LoginPageControl} />
            </Switch>
        </dir>
    );
}

export default App;
