import { combineReducers, Action } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";

import commonReducer from "./common/commonSlice";
import datasetReducer from "./dataset/datasetSlice";

const rootReducer = combineReducers({
    common: commonReducer,
    dataset: datasetReducer,
});

export default rootReducer;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof rootReducer>;
