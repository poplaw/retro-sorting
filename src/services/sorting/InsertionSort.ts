import SortingStrategy from "./SortingStrategy";
import SteppedSortingService from "../SteppedSortingService";

export default class InsertionSort implements SortingStrategy {
    private service: SteppedSortingService;

    async sort(array: number[]): Promise<void> {
        for (let next = 1; next < array.length; ++next) {
            let currentIndex = next;
            const temp = array[next];

            while (currentIndex > 0 && temp < array[currentIndex - 1]) {
                array[currentIndex] = array[currentIndex - 1];
                --currentIndex;
            }

            array[currentIndex] = temp;
            if (!(await this.service.notifyStepDone(array))) return;
        }
    }

    setSteppedSortingService(service: SteppedSortingService): SortingStrategy {
        this.service = service;
        return this;
    }
}
