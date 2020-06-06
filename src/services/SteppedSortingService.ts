import SortingStrategy from "./sorting/SortingStrategy";
import SortingStrategyNullObject from "./sorting/SortingStrategyNullObject";

export default class SteppedSortingService {
    comparisons: number;
    arrayAccesses: number;
    iterations: number;
    private strategy: SortingStrategy;
    private onStepDone: (numbers: number[]) => void;
    private isRunning: boolean;
    private isPaused: boolean;

    constructor(private readonly delay: number) {
        this.strategy = new SortingStrategyNullObject();
    }

    setSortingStrategy(strategy: SortingStrategy): SteppedSortingService {
        this.strategy = strategy;
        return this;
    }

    stop(): void {
        this.isRunning = false;
    }

    async start(numbers: number[]): Promise<void> {
        if (this.isRunning) {
            this.isPaused = !this.isPaused;
        }

        this.comparisons = 0;
        this.arrayAccesses = 0;
        this.iterations = 0;
        this.isRunning = true;
        this.isPaused = false;
        await this.strategy.sort(numbers);
        this.isRunning = false;
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
