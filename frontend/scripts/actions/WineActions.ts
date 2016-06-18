import queryString = require('query-string');
import objectAssign = require('object-assign');
import { map, filter } from 'lodash';

import { IApp } from '../types/main';
import { IFilter, IRequestFilter } from '../types/filter';
import { IWine, IWineResponse, IEntryResponse } from '../types/wine';
import { IRegion, RegionType } from '../types/region';
import { ActionType } from './ActionTypes';

const baseUrl: string = '/api/wine';

function requestWines(filter: IFilter) {
    return {
        type: ActionType.REQUEST_WINES,
        filter
    };
}

function receiveWinesSuccess(wineResponse: IWineResponse) {
    return {
        type: ActionType.RECEIVE_WINES_SUCCESS,
        count: wineResponse.count,
        wines: wineResponse.wines
    };
}

function receiveWinesError(error: Response) {
    return {
        type: ActionType.RECEIVE_WINES_ERROR,
        error
    };
}

function requestEntry(id: number) {
    return {
        type: ActionType.REQUEST_ENTRY,
        id
    };
}

function receiveEntrySuccess(res: IEntryResponse) {
    return {
        type: ActionType.RECEIVE_ENTRY_SUCCESS,
        res
    };
}

function receiveEntryError(error: Response) {
    return {
        type: ActionType.RECEIVE_ENTRY_ERROR,
        error
    }
}

function asyncFetchWines(filter: IFilter) {
    return (dispatch) => {
        dispatch(requestWines(filter));
        return fetch(`${baseUrl}?${queryString.stringify(convertToRequestFilter(filter))}`)
            .then((response: Response) => {
                if (response.status >= 200) {
                    return response;
                } else {
                    dispatch(receiveWinesError(response.error()));
                    throw new Error(response.statusText);
                }
            })
            .then((response: Response) => response.json())
            .then((data: IWineResponse) => dispatch(receiveWinesSuccess(data)));
    }
}

function asyncFetchEntry(id: number) {
    return (dispatch) => {
        dispatch(requestEntry(id));
        return fetch (`${baseUrl}/${id}`)
            .then((response: Response) => {
                if (response.status >= 200) {
                    return response;
                } else {
                    receiveEntryError(response.error());
                    throw new Error(response.statusText);
                }
            })
            .then((response: Response) => response.json())
            .then((data: IEntryResponse) => dispatch(receiveEntrySuccess(data)));
    }
}

function convertToRequestFilter(f: IFilter): IRequestFilter {
    const countries = map<IRegion, string>(filter(f.regions, (r) => r.type === RegionType.COUNTRY), 'name');
    const regions = map<IRegion, string>(filter(f.regions, (r) => r.type === RegionType.REGION), 'name');
    const subregions = map<IRegion, string>(filter(f.regions, (r) => r.type === RegionType.SUBREGION), 'name');
    return {
        countries: countries,
        regions: regions,
        subregions: subregions,
        wine_types: f.wine_types,
        varietals: f.varietals,
        vintage: f.vintage,
        vintage_from: f.vintage_from,
        vintage_to: f.vintage_to,
        name: f.name,
    };
}

export function fetchWines(filter: IFilter) {
    return (dispatch, getState) => {
        const state: IApp = getState();
        if (state.wine.allWines.length === 0) {
            dispatch(asyncFetchWines(filter));
        }
    }
}

export function fetchWinesWithNewFilter(filter: IFilter) {
    return (dispatch, getState) => {
        dispatch(asyncFetchWines(filter));
    }
}

export function fetchEntry(id: number) {
    return (dispatch, getState) => dispatch(asyncFetchEntry(id));
}