import { combineReducers, Action } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";

import commonReducer from "./common/commonSlice";
import datasetReducer from "./dataset/datasetSlice";
import currentAlgorithmSlice from "./currentAlgorithm/currentAlgorithmSlice";

const rootReducer = combineReducers({
    common: commonReducer,
    dataset: datasetReducer,
    currentAlgorithm: currentAlgorithmSlice,
});

export default rootReducer;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof rootReducer>;
