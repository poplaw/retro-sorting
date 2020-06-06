import SortingStrategy from "./SortingStrategy";
import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import SelectionSort from "./SelectionSort";
import MergeSort from "./MergeSort";

export enum SortingStrategyType {
    Bubble,
    Insertion,
    Selection,
    Merge,
}

export default class SortingFactory {
    private static mapper = new Map<SortingStrategyType, SortingStrategy>([
        [SortingStrategyType.Bubble, new BubbleSort()],
        [SortingStrategyType.Insertion, new InsertionSort()],
        [SortingStrategyType.Selection, new SelectionSort()],
        [SortingStrategyType.Merge, new MergeSort()],
    ]);

    get(type: SortingStrategyType): SortingStrategy {
        return SortingFactory.mapper.get(type);
    }

    getAvailableStrategies(): IterableIterator<SortingStrategy> {
        return SortingFactory.mapper.values();
    }
}
