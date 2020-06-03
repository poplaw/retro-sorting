import { combineReducers, Action } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";

import commonReducer from "./common/commonSlice";

const rootReducer = combineReducers({
    common: commonReducer,
});

export default rootReducer;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof rootReducer>;
