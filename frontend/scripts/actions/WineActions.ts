import queryString = require('query-string');
import objectAssign = require('object-assign');
import { map, filter } from 'lodash';

import { IFilter, IRequestFilter } from '../types/filter';
import { IWine, IWineResponse } from '../types/wine';
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

function asyncFetchWines(filter: IFilter) {
    return (dispatch) => {
        dispatch(requestWines(filter));
        return fetch(`${baseUrl}?${queryString.stringify(convertToRequestFilter(filter))}`)
            .then((response: Response) => {
                if (response.status >= 200) {
                    return response
                } else {
                    receiveWinesError(response.error());
                    throw new Error(response.statusText);
                }
            })
            .then((response: Response) => response.json())
            .then((data: IWineResponse) => dispatch(receiveWinesSuccess(data)));
    }
}

function convertToRequestFilter(fltr: IFilter): IRequestFilter {
    const countries = map<IRegion, string>(filter(fltr.regions, (r) => r.type === RegionType.COUNTRY), 'name');
    const regions = map<IRegion, string>(filter(fltr.regions, (r) => r.type === RegionType.REGION), 'name');
    const subregions = map<IRegion, string>(filter(fltr.regions, (r) => r.type === RegionType.SUBREGION), 'name');
    return {
        countries: countries,
        regions: regions,
        subregions: subregions,
        wine_types: fltr.wine_types,
        varietals: fltr.varietals,
        vintage: fltr.vintage,
        vintage_from: fltr.vintage_from,
        vintage_to: fltr.vintage_to,
        name: fltr.name,
    };
}

export function fetchWines(filter: IFilter) {
    return (dispatch, getState) => dispatch(asyncFetchWines(filter))
}