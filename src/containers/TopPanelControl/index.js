import React from "react";
import { useSelector } from "react-redux";
import { clearSessionData } from "../../utils/functions/localstoreFunctions";
import TopPanel from "../../components/panels/TopPanel";

const Index = () => {
    const { currentPage, userData } = useSelector((state) => ({
        currentPage: state.currentPage,
        userData: state.userData,
    }));

    const { username } = userData;

    const handleLogout = () => clearSessionData();

    return (
        <TopPanel
            username={username}
            currentPage={currentPage}
            handleLogout={handleLogout}
        />
    );
};

export default Index;
