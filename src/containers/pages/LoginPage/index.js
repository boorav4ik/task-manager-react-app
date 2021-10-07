import LoginPageView from "../../../components/LoginPageView";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginPost } from "../../../api";
import { setUserData } from "../../../reduxe/actions";
import {
    getSessionUsername,
    setSessionData,
    clearSessionData,
} from "../../../utils/functions/localstoreFunctions";
import getLoginPageMessage from "../../../utils/functions/getLoginPageMessage";
import PropTypes from "prop-types";

const OK = "ok";

const Index = ({ location }) => {
    const { currentPageUrl, userData } = useSelector((state) => ({
        currentPageUrl: state.currentPageUrl,
        userData: state.userData,
    }));
    const dispatch = useDispatch();
    const username = getSessionUsername() ?? userData.username;

    useEffect(() => {
        if (username && username !== userData.username)
            dispatch(setUserData({ username }));
    }, [username]);

    const handleLogin = async (loginParams) => {
        const loginResponse = await loginPost(loginParams);
        if (loginResponse.status === 200 && loginResponse.data.status === OK) {
            setSessionData(
                loginParams.username,
                loginResponse.data.message.token
            );
            dispatch(setUserData({ username: loginParams.username }));
            return {};
        }
        return loginResponse.data.message;
    };

    const handleLogout = () => {
        clearSessionData();
        setUserData({});
    };

    return (
        <LoginPageView
            userData={userData}
            currentPageUrl={currentPageUrl}
            message={getLoginPageMessage(location.pathname)}
            handleLogout={handleLogout}
            handleLogin={handleLogin}
        />
    );
};

Index.propTypes = {
    location: PropTypes.object,
};

export default Index;
