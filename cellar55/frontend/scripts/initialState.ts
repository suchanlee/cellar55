import { IFilter } from './types/filter';
import { IApp } from './types/main';

export const emptyFilter: IFilter = {
    regions: [],
    wine_types: [],
    varietals: [],
    vintage: '',
    vintage_from: '',
    vintage_to: '',
    name: ''
};

export const initialState: IApp = {
    filterState: {
        initial: emptyFilter,
        current: emptyFilter,
        isOpen: true
    },
    state: {
        isFilterOpen: false,
        isFilterChanged: false,
    },
    wine: {
        isQueryingWines: true,
        isFetchingEntry: true,
        wines: [],
        selectedWine: null,
        allWines: [],
        entry: null,
        error: null
    }
};