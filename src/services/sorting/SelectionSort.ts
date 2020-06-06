import SortingStrategy from "./SortingStrategy";
import SteppedSortingService from "../SteppedSortingService";

export default class SelectionSort implements SortingStrategy {
    private service: SteppedSortingService;
    private toBeCancelled: boolean;

    async sort(array: number[]): Promise<void> {
        let i = 0;
        this.toBeCancelled = false;
        while (i < array.length) {
            console.log(this.toBeCancelled);
            if (this.toBeCancelled) {
                return;
            }

            const mini = await this.indexOfMin(array, i);

            const temp = array[i];
            array[i] = array[mini];
            array[mini] = temp;

            ++i;
        }
    }

    async indexOfMin(array: number[], index: number): Promise<number> {
        let min = array[index];
        let minIndex = index;

        for (let i = index; i < array.length; ++i) {
            if (array[i] < min) {
                min = array[i];
                minIndex = i;
            }

            const isRunning = await this.service.notifyStepDone(array.slice());

            if (!isRunning) {
                this.toBeCancelled = true;
                return;
            }
        }

        return minIndex;
    }

    setSteppedSortingService(service: SteppedSortingService): SortingStrategy {
        this.service = service;
        return this;
    }

    getName(): string {
        return "Selection sort";
    }
}
