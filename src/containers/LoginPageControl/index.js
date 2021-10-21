import LoginPageView from "../../components/LoginPageView";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../api";
import { SUCCESS } from "../../utils/const";
import { setUserData } from "../../reduxe/actions";
import {
    getSessionUsername,
    setSessionData,
    clearSessionData,
} from "../../utils/functions/localstoreFunctions";
import getLoginPageMessage from "../../utils/functions/getLoginPageMessage";
import PropTypes from "prop-types";

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
        const { result, message } = await post(
            { prefix: "login" },
            loginParams
        );

        if (result === SUCCESS) {
            setSessionData(loginParams.username, message.token);
            dispatch(setUserData({ username: loginParams.username }));
        }
        return message;
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
