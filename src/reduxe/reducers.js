import { combineReducers } from "redux";
import { CURRENT_PAGE_URL, USER_DATA } from "./actionTypes";

const currentPageUrl = (state = "", { type, value }) => {
    switch (type) {
        case CURRENT_PAGE_URL:
            return value;
        default:
            return state;
    }
};

const userData = (state = {}, { type, value }) => {
    switch (type) {
        case USER_DATA:
            return value;
        default:
            return state;
    }
};

const resultReducer = combineReducers({ currentPageUrl, userData });

export default resultReducer;
