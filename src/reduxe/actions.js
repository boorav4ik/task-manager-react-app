import { CURRENT_PAGE_URL, USER_DATA } from "./actionTypes";

export const setCurrentPageURL = (value) => ({ type: CURRENT_PAGE_URL, value });

export const setUserData = (value) => ({ type: USER_DATA, value });
