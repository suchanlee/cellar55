import queryString = require('query-string');
import objectAssign = require('object-assign');

import { ActionType } from './ActionTypes';

const baseUrl: string = '/api/wine';

function requestWines(filter: Types.IFilter) {
    return {
        type: ActionType.REQUEST_WINES,
        filter
    };
}

function receiveWinesSuccess(wineResponse: Types.IWineResponse) {
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

function asyncFetchWines(filter: Types.IFilter) {
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
            .then((data: Types.IWineResponse) => dispatch(receiveWinesSuccess(data)));
    }
}

export function fetchWines(filter: Types.IFilter) {
    return (dispatch, getState) => dispatch(asyncFetchWines(filter))
}