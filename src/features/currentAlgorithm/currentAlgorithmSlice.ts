import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = "";

export const currentAlgorithmSlice = createSlice({
    name: "currentAlgorithm",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<string>) => action.payload,
    },
});

export const getCurrentAlgorithm = (state: RootState): string =>
    state.currentAlgorithm;

export default currentAlgorithmSlice.reducer;
