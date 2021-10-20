import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSessionData } from "../../utils/functions/localstoreFunctions";
import LeftPanel from "../../components/LeftPanel";
import { setUserData } from "../../reduxe/actions";
const Index = () => {
    const { currentPage, userData } = useSelector((state) => ({
        currentPage: state.currentPage,
        userData: state.userData,
    }));
    const dispatch = useDispatch();

    const { username } = userData;

    const handleLogout = () => {
        clearSessionData();
        dispatch(setUserData({}));
    };

    return (
        <LeftPanel
            username={username}
            currentPage={currentPage}
            handleLogout={handleLogout}
        />
    );
};

export default Index;
