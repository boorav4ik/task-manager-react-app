import { combineReducers } from "redux";
import { CURRENT_PAGE_URL, USER_IS_LOGIN } from "./actionTypes";

const currentPageUrl = (state = "", { type, value }) => {
    switch (type) {
        case CURRENT_PAGE_URL:
            return value;
        default:
            return state;
    }
};

const userIsLogin = (state = false, { type, value }) => {
    switch (type) {
        case USER_IS_LOGIN:
            return value;
        default:
            return state;
    }
};

const resultReducer = combineReducers({ currentPageUrl, userIsLogin });

export default resultReducer;
