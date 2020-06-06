import SortingStrategy from "./SortingStrategy";
import SteppedSortingService from "../SteppedSortingService";

export default class BubbleSort implements SortingStrategy {
    private service: SteppedSortingService;

    async sort(array: number[]): Promise<void> {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                this.service.notifyComparision();
                if (array[j] > array[j + 1]) {
                    this.service.notifyArrayAccess();
                    const swap = array[j];
                    this.service.notifyArrayAccess(2);
                    array[j] = array[j + 1];
                    this.service.notifyArrayAccess();
                    array[j + 1] = swap;
                }

                if (await !this.service.notifyStepDone(array.slice())) return;
            }
        }
    }

    setSteppedSortingService(service: SteppedSortingService): SortingStrategy {
        this.service = service;
        return this;
    }
}
