import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import * as d3 from "d3";

const initialState: number[] = [];

export const datasetSlice = createSlice({
    name: "dataset",
    initialState,
    reducers: {
        updateDataset: (state, action: PayloadAction<number[]>) =>
            action.payload,

        shuffle: state => d3.shuffle(state),
    },
});

export const getDataset = (state: RootState): number[] => state.dataset;

export default datasetSlice.reducer;
