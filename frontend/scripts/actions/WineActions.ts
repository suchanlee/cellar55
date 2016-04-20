import queryString = require('query-string');
import objectAssign = require('object-assign');

import { IFilter } from '../types/filter';
import { IWine, IWineResponse } from '../types/wine';
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
        return fetch(`${baseUrl}?${queryString.stringify(filter)}`)
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

export function fetchWines(filter: IFilter) {
    return (dispatch, getState) => dispatch(asyncFetchWines(filter))
}