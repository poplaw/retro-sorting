import SortingStrategy from "./SortingStrategy";
import SteppedSortingService from "../SteppedSortingService";

export default class MergeSort implements SortingStrategy {
    private service: SteppedSortingService;
    private toBeCancelled: boolean;

    async sort(array: number[]): Promise<void> {
        this.toBeCancelled = false;
        await this.mergeSort(array, 0, array.length - 1);
    }

    async mergeSort(array: number[], l: number, r: number): Promise<void> {
        if (l < r) {
            const m = Math.floor((l + r) / 2);

            await this.mergeSort(array, l, m);
            await this.mergeSort(array, m + 1, r);

            await this.merge(array, l, m, r);
        }
    }

    async merge(
        array: number[],
        l: number,
        m: number,
        r: number
    ): Promise<void> {
        if (this.toBeCancelled) {
            return;
        }

        const n1 = m - l + 1;
        const n2 = r - m;

        const left: number[] = [];
        const right: number[] = [];

        for (let i = 0; i < n1; ++i) {
            left[i] = array[l + i];
        }

        for (let i = 0; i < n2; ++i) {
            right[i] = array[m + 1 + i];
        }

        let i = 0,
            j = 0;

        let k = l;

        while (i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                array[k] = left[i];
                ++i;
            } else {
                array[k] = right[j];
                ++j;
            }
            ++k;
        }

        while (i < n1) {
            array[k] = left[i];
            ++i;
            ++k;
        }

        while (j < n2) {
            array[k] = right[j];
            ++j;
            ++k;
        }

        const isRunning = await this.service.notifyStepDone(array.slice());

        if (!isRunning) {
            this.toBeCancelled = true;
            return;
        }
    }

    setSteppedSortingService(service: SteppedSortingService): SortingStrategy {
        this.service = service;
        return this;
    }

    getName(): string {
        return "Merge sort";
    }
}
