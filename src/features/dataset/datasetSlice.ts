import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: number[] = [];

export const datasetSlice = createSlice({
    name: "dataset",
    initialState,
    reducers: {
        updateDataset: (state, action: PayloadAction<number[]>) =>
            action.payload,
    },
});

export const getDataset = (state: RootState) => state.dataset;

export default datasetSlice.reducer;
