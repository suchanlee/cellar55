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
    filter: emptyFilter,
    wine: {
        isQueryingWines: true,
        isFetchingEntry: true,
        wines: [],
        allWines: [],
        entry: null,
        error: null
    }
};