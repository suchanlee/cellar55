import objectAssign = require('object-assign');

import { initialState } from '../initialState';
import { ActionType } from '../actions/ActionTypes';

export default function wineReducer(state = initialState.wine, action) {
    switch (action.type) {

        case ActionType.REQUEST_WINES:
            return objectAssign({}, state, {
                isFetching: true,
                wines: []
            });

        case ActionType.RECEIVE_WINES_SUCCESS:
            let newState = objectAssign({}, state, {
                isFetching: false,
                wines: action.wines,
                error: null
            });
            if (newState.allWines.length === 0) {
                newState.allWines = action.wines;
            }
            return newState;

        case ActionType.RECEIVE_WINES_ERROR:
            return objectAssign({}, state, {
                error: 'failure'
            });

        default:
            return state;
    }
}
