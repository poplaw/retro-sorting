import React, { FC, useRef, useState } from "react";
import { toolbar } from "./toolbar.module.scss";
import Button from "../Button";
import MediaControls from "../MediaControls/MediaControls";
import DatasetDialog from "../Dialogs/Dataset";
import AlgorithmDialog from "../Dialogs/Algorithm";
import { useDispatch, useSelector } from "react-redux";
import { datasetSlice, getDataset } from "../../features/dataset/datasetSlice";
import * as d3 from "d3";
import SteppedSortingService from "../../services/SteppedSortingService";
import InsertionSort from "../../services/sorting/InsertionSort";
import MergeSort from "../../services/sorting/MergeSort";

const Toolbar: FC = () => {
    const dispatch = useDispatch();
    const dataset = useSelector(getDataset);

    const [isOpen, setIsOpen] = useState(false);
    const [isAlgOpen, setIsAlgOpen] = useState(true);

    const service = useRef<SteppedSortingService>();
    if (!service.current) service.current = new SteppedSortingService(16);

    return (
        <nav className={toolbar}>
            <DatasetDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <AlgorithmDialog
                isOpen={isAlgOpen}
                onClose={() => setIsAlgOpen(false)}
                onSelectStrategy={strategy =>
                    service.current
                        .setSortingStrategy(
                            strategy.setSteppedSortingService(service.current)
                        )
                        .setOnStepDone(numbers => {
                            dispatch(
                                datasetSlice.actions.updateDataset([...numbers])
                            );
                        })
                }
            />
            <Button variant={"is-primary"} onClick={() => setIsAlgOpen(true)}>
                Algorithm
            </Button>
            <Button
                variant={"is-primary"}
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Dataset
            </Button>
            <Button
                variant={"is-primary"}
                onClick={async () => {
                    dispatch(datasetSlice.actions.shuffle());
                }}
            >
                Shuffle
            </Button>
            <MediaControls
                onStopClick={() => {
                    service.current.stop();
                }}
                onPlayPauseClick={() => {
                    service.current.start(dataset.slice());
                }}
            />
        </nav>
    );
};

export default Toolbar;
