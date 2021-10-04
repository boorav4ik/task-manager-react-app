import {
    CURRENT_PAGE_URL,
    USER_IS_LOGIN,
} from "./actionTypes";

export const setCurrentPageURL = (value) => ({ type: CURRENT_PAGE_URL, value });

export const setUserIsLogin = (value) => ({ type: USER_IS_LOGIN, value });
