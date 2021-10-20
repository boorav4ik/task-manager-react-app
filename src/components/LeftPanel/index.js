import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { ViewWeek } from "@material-ui/icons";
import { Login, Logout } from "@mui/icons-material";

const Index = ({ currentPage, username, handleLogout }) => (
    <dir className="flex-column p-1 left-panel">
        <Button
            component={Link}
            to={`/?page=${currentPage}`}
            startIcon={<ViewWeek className="r-90" />}
            size="large"
            variant="outlined"
        >
            Tasks
        </Button>
        {username ? (
            <Button
                onClick={handleLogout}
                variant="outlined"
                size="large"
                startIcon={<Logout />}
            >
                Logout
            </Button>
        ) : (
            <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                startIcon={<Login />}
            >
                Login
            </Button>
        )}
    </dir>
);

Index.propTypes = {
    currentPage: PropTypes.string,
    username: PropTypes.string,
    handleLogout: PropTypes.func,
};

export default Index;
