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
        isFetching: false,
        wines: [],
        allWines: [],
        currentWine: null,
        error: null
    }
};