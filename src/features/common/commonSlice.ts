import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface CommonState {
    name: string;
    version: string;
    isSorting: boolean;
}

const initialState: CommonState = {
    name: "Vocabulary tester",
    version: "Alpha 0.1",
    isSorting: false,
};

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setIsSorting: (state, action: PayloadAction<boolean>) => {
            state.isSorting = action.payload;
        },
    },
});

export const getApplicationName = (state: RootState): string =>
    state.common.name;

export const getAppVerison = (state: RootState): string => state.common.version;

export const isSorting = (state: RootState): boolean => state.common.isSorting;

export default commonSlice.reducer;
