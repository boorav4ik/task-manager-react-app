import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";
import resultReducer from "./reducers";

export const store = createStore(resultReducer, applyMiddleware(ReduxThunk));
