import SortingStrategy from "./SortingStrategy";
import SteppedSortingService from "../SteppedSortingService";

export default class SelectionSort implements SortingStrategy {
    private service: SteppedSortingService;
    private toBeCancelled: boolean;

    async sort(array: number[]): Promise<void> {
        let i = 0;
        while (i < array.length) {
            const mini = this.indexOfMin(array, i);

            const temp = array[i];
            array[i] = array[mini];
            array[mini] = temp;

            ++i;

            if (await !this.service.notifyStepDone(array.slice())) return;
        }
    }

    indexOfMin(array: number[], index: number): number {
        let min = array[index];
        let minIndex = index;

        for (let i = index; i < array.length; ++i) {
            if (array[i] < min) {
                min = array[i];
                minIndex = i;
            }
        }

        return minIndex;
    }

    setSteppedSortingService(service: SteppedSortingService): SortingStrategy {
        this.service = service;
        return this;
    }
}
