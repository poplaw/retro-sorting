import React, {
    useState,
    FC,
    EventHandler,
    MouseEvent,
    useCallback,
    useEffect,
} from "react";
import Button from "../Button";
import { container } from "./media-controls.module.scss";

interface MediaControlsProps {
    onPlayPauseClick?: (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => void;
    onStopClick?: (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => void;
    isPlaying?: boolean;
    isPaused?: boolean;
}

const MediaControls: FC<MediaControlsProps> = ({
    onPlayPauseClick,
    onStopClick,
    isPaused = false,
    isPlaying = false,
}) => {
    const [isPausedState, setIsPaused] = useState<boolean>(isPaused);
    const [, setIsPlaying] = useState<boolean>(isPlaying);

    return (
        <div className={container}>
            <Button
                variant={"is-primary"}
                onClick={e => {
                    setIsPaused(false);
                    setIsPlaying(false);
                    onStopClick && onStopClick(e);
                }}
            >
                ▮
            </Button>
            <Button
                variant={"is-primary"}
                onClick={e => {
                    setIsPlaying(true);
                    setIsPaused(!isPausedState);
                    onPlayPauseClick && onPlayPauseClick(e);
                }}
            >
                {isPausedState ? "||" : "▶"}
            </Button>
        </div>
    );
};

//

export default MediaControls;
