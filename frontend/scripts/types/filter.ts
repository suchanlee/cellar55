export interface IFilterDelta {
    countries?: string[];
    regions?: string[];
    subregions?: string[];
    wine_types?: string[];
    varietals?: string[];
    vintage?: string;
    vintage_from?: string;
    vintage_to?: string;
    name?: string;
}

export interface IFilter {
    countries: string[];
    regions: string[];
    subregions: string[];
    wine_types: string[];
    varietals: string[];
    vintage: string;
    vintage_from: string;
    vintage_to: string;
    name: string;
}