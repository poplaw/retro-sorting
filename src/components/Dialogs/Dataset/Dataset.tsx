import React, { FC, useState } from "react";
import * as d3 from "d3";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
    getDataset,
    datasetSlice,
} from "../../../features/dataset/datasetSlice";

interface DatasetDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const generateRandomData = (
    min: number,
    max: number,
    size: number
): number[] => {
    const random = d3.randomUniform(min, max);

    const randoms: number[] = [];
    for (let i = 0; i < size; ++i) {
        randoms.push(random());
    }

    return randoms;
};

const GeneratedDataset: FC = () => {
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(1000);
    const [datasetSize, setDatasetSize] = useState<number>(100);
    const dispatch = useDispatch();

    return (
        <div className="nes-container with-title">
            <p className="title">Generated dataset</p>
            <div className="nes-field is-inline">
                <label htmlFor="min-field">Min</label>
                <input
                    type="number"
                    id="min-field"
                    className="nes-input"
                    value={minValue}
                    onChange={e => setMinValue(parseInt(e.target.value))}
                ></input>
            </div>
            <div className="nes-field is-inline">
                <label htmlFor="max-field">Max</label>
                <input
                    type="number"
                    id="max-field"
                    className="nes-input"
                    value={maxValue}
                    onChange={e => setMaxValue(parseInt(e.target.value))}
                ></input>
            </div>
            <div className="nes-field is-inline">
                <label htmlFor="size-field">Dataset size</label>
                <input
                    type="number"
                    id="size-field"
                    className="nes-input"
                    value={datasetSize}
                    onChange={e => setDatasetSize(parseInt(e.target.value))}
                ></input>
            </div>
            <button
                className="nes-btn is-primary"
                onClick={() =>
                    dispatch(
                        datasetSlice.actions.updateDataset(
                            generateRandomData(minValue, maxValue, datasetSize)
                        )
                    )
                }
            >
                Generate
            </button>
        </div>
    );
};

const CustomDataset: FC = () => {
    const dataset = useSelector(getDataset);
    const dispatch = useDispatch();
    const [autoDispatch, setAutoDispatch] = useState(true);
    const [tempState, setTempState] = useState("");

    return (
        <div className="nes-container with-title">
            <p className="title">Custom dataset</p>
            <label>
                <input
                    type="radio"
                    className="nes-radio"
                    name="auto-dispatch"
                    checked={autoDispatch}
                    onClick={() => {
                        dispatch(
                            datasetSlice.actions.updateDataset(
                                tempState
                                    .split(",")
                                    .map(item => parseFloat(item))
                                    .filter(number => !isNaN(number))
                            )
                        );
                        setAutoDispatch(true);
                    }}
                />
                <span>Automatic dispatch</span>
            </label>

            <label>
                <input
                    type="radio"
                    className="nes-radio"
                    checked={!autoDispatch}
                    onClick={() => {
                        setTempState(dataset.toString());
                        setAutoDispatch(false);
                    }}
                />
                <span>Edit mode</span>
            </label>
            <textarea
                id="dataset-textarea"
                className="nes-textarea"
                value={autoDispatch ? dataset.toString() : tempState}
                onChange={e => {
                    if (!autoDispatch) {
                        setTempState(e.target.value);
                    } else {
                        dispatch(
                            datasetSlice.actions.updateDataset(
                                e.target.value
                                    .split(",")
                                    .map(item => parseFloat(item))
                                    .filter(number => !isNaN(number))
                            )
                        );
                    }
                }}
            ></textarea>
        </div>
    );
};

const DatasetDialog: FC<DatasetDialogProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            style={{
                content: {
                    width: "75vw",
                    height: "75vh",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignContent: "stretch",
                },
            }}
            contentLabel="Select the dataset"
        >
            <p className="nes-dialog">Dataset options</p>
            <GeneratedDataset />
            <CustomDataset />
            <button className="nes-btn is-primary" onClick={onClose}>
                Close
            </button>
        </Modal>
    );
};

export default DatasetDialog;
