import SortingStrategy from "./sorting/SortingStrategy";
import SortingStrategyNullObject from "./sorting/SortingStrategyNullObject";
import { Dispatch } from "react";
import { RootState } from "../features";
import { commonSlice } from "../features/common/commonSlice";

export default class SteppedSortingService {
    comparisons: number;
    arrayAccesses: number;
    iterations: number;
    private strategy: SortingStrategy;
    private onStepDone: (numbers: number[]) => void;
    private isRunning: boolean;
    private isPaused: boolean;
    private dispatcher: Dispatch<any>;

    constructor(private readonly delay: number, dispatcher: Dispatch<any>) {
        this.strategy = new SortingStrategyNullObject();
        this.dispatcher = dispatcher;
    }

    setSortingStrategy(strategy: SortingStrategy): SteppedSortingService {
        this.strategy = strategy;
        return this;
    }

    private setIsRunning(isRunning: boolean): void {
        this.isRunning = isRunning;
        this.dispatcher(commonSlice.actions.setIsSorting(isRunning));
    }

    stop(): void {
        this.setIsRunning(false);
    }

    async start(numbers: number[]): Promise<void> {
        if (this.isRunning) {
            return;
        }

        this.comparisons = 0;
        this.arrayAccesses = 0;
        this.iterations = 0;
        this.setIsRunning(true);
        this.isPaused = false;
        await this.strategy.sort(numbers);
        this.stop();
    }

    setOnStepDone(func: (numbers: []) => void): SteppedSortingService {
        this.onStepDone = func;
        return this;
    }

    notifyComparision(): void {
        ++this.comparisons;
    }

    notifyArrayAccess(amount = 1): void {
        this.arrayAccesses += amount;
    }

    async notifyStepDone(numbers: number[]): Promise<boolean> {
        ++this.iterations;
        this.onStepDone(numbers);
        await new Promise(resolve => {
            setTimeout(resolve, this.delay);
        });
        return this.isRunning;
    }
}
