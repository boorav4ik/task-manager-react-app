import AdminLoginForm from "../../components/AdminLoginForm";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginPost } from "../../api";
import { setUserIsLogin } from "../../reduxe/actions";
import {
    checkAuthUsername,
    saveAuthData,
    clearAuthData,
} from "../../utils/functions/localstoreFunctions";

const OK = "ok";

const Index = ({ history }) => {
    const { userIsLogin, currentPageUrl } = useSelector((state) => ({
        userIsLogin: state.userIsLogin,
        currentPageUrl: state.currentPageUrl,
    }));
    const dispatch = useDispatch();

    const username = checkAuthUsername();
    console.log(username);
    if (username) {
        dispatch(setUserIsLogin(Boolean(username)));
    }

    const onLoginClick = async (data) => {
        const loginResponse = await loginPost(data);
        if (loginResponse.status === 200 && loginResponse.data.status === OK) {
            saveAuthData(username, loginResponse.data.message.token);
            dispatch(setUserIsLogin(true));
        } else {
            return loginResponse.data.message;
        }
    };

    const handleRedirectToMain = () => history.push(currentPageUrl);

    const onLogoutClick = () => {
        dispatch(setUserIsLogin(false));
        clearAuthData();
    };

    return (
        <AdminLoginForm
            userData={userIsLogin ? { username } : {}}
            onToMainClick={handleRedirectToMain}
            onLogoutClick={onLogoutClick}
            onLoginClick={onLoginClick}
        />
    );
};

Index.propTypes = {
    history: PropTypes.object,
};

Index.defaultProps = {
    history: {},
};

export default Index;
