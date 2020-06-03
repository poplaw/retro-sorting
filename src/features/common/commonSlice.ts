import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface CommonState {
    name: string;
    version: string;
}

const initialState: CommonState = {
    name: "Vocabulary tester",
    version: "Alpha 0.1",
};

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {},
});

export const getApplicationName = (state: RootState): string =>
    state.common.name;

export const getAppVerison = (state: RootState): string => state.common.version;

export default commonSlice.reducer;
