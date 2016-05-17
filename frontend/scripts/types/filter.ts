import { IRegion } from './region';

export interface IFilterDelta {
    regions?: IRegion[];
    wine_types?: string[];
    varietals?: string[];
    vintage?: string;
    vintage_from?: string;
    vintage_to?: string;
    name?: string;
}

export interface IFilter {
    regions: IRegion[];
    wine_types: string[];
    varietals: string[];
    vintage: string;
    vintage_from: string;
    vintage_to: string;
    name: string;
}

export interface IRequestFilter {
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