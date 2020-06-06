import React, { FC } from "react";
import Modal from "react-modal";
import SortingFactory from "../../../services/sorting/SortingFactory";
import SortingStrategy from "../../../services/sorting/SortingStrategy";
import { useDispatch } from "react-redux";
import { currentAlgorithmSlice } from "../../../features/currentAlgorithm/currentAlgorithmSlice";

interface DatasetDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectStrategy: (strategy: SortingStrategy) => void;
}

const sortingFactory = new SortingFactory();

const AlgorithmDialog: FC<DatasetDialogProps> = ({
    isOpen,
    onClose,
    onSelectStrategy,
}) => {
    const dispatch = useDispatch();

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
            <p className="nes-dialog">Algorithm options</p>

            {Array.from(sortingFactory.getAvailableStrategies()).map(
                (element, index) => (
                    <button
                        className="nes-btn is-primary"
                        key={index}
                        onClick={() => {
                            dispatch(
                                currentAlgorithmSlice.actions.update(
                                    element.getName()
                                )
                            );
                            onSelectStrategy(element);
                            onClose();
                        }}
                    >
                        {element.getName()}
                    </button>
                )
            )}

            <button className="nes-btn is-primary" onClick={onClose}>
                Close
            </button>
        </Modal>
    );
};

export default AlgorithmDialog;
