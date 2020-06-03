import React, { FC } from "react";
import { toolbar } from "./toolbar.module.scss";
import Button from "../Button";
import MediaControls from "../MediaControls/MediaControls";

const Toolbar: FC = () => {
    return (
        <nav className={toolbar}>
            <Button variant={"is-primary"}>Algorithm</Button>
            <Button variant={"is-primary"}>Dataset</Button>
            <Button variant={"is-primary"}>Shuffle</Button>
            <MediaControls />
        </nav>
    );
};

export default Toolbar;
