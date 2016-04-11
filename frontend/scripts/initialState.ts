export const emptyFilter: Types.IFilter = {
    countries: [],
    regions: [],
    subregions: [],
    wine_types: [],
    varietals: [],
    vintage: '',
    vintage_from: '',
    vintage_to: '',
    name: ''
}

export const initialState: Types.IApp = {
    filter: emptyFilter,
    wine: {
        isFetching: false,
        wines: [],
        currentWine: null,
        error: null
    }
};