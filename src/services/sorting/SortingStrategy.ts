import SteppedSortingService from "../SteppedSortingService";

export default interface SortingStrategy {
    sort: (array: number[]) => Promise<void>;
    setSteppedSortingService: (
        service: SteppedSortingService
    ) => SortingStrategy;
    getName(): string;
}
