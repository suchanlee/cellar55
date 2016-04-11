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
            return objectAssign({}, state, {
                isFetching: false,
                wines: action.wines,
                error: null
            });

        case ActionType.RECEIVE_WINES_ERROR:
            return objectAssign({}, state, {
                error: 'failure'
            });

        default:
            return state;
    }
}
