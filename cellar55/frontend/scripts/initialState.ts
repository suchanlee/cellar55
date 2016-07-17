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
    wine: {
        isQueryingWines: true,
        isFetchingEntry: false,
        wines: [],
        selectedWine: undefined,
        allWines: [],
        entry: undefined,
        error: undefined
    }
};