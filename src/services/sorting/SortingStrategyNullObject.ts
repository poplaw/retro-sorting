/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SortingStrategy from "./SortingStrategy";
import SteppedSortingService from "../SteppedSortingService";

export default class SortingStrategyNullObject implements SortingStrategy {
    async sort(array: number[] = []): Promise<void> {}
    setSteppedSortingService(service: SteppedSortingService): SortingStrategy {
        return new SortingStrategyNullObject();
    }
    getName(): string {
        return "";
    }
}
