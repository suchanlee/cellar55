import objectAssign = require('object-assign');

import { IWineState } from '../types/wine';

import { initialState } from '../initialState';
import { ActionType } from '../actions/ActionTypes';

export default function wineReducer(state: IWineState = initialState.wine, action) {
    switch (action.type) {

        case ActionType.REQUEST_WINES:
            return objectAssign({}, state, {
                isQueryingWines: true,
                wines: []
            });

        case ActionType.RECEIVE_WINES_SUCCESS:
            let newState = objectAssign({}, state, {
                isQueryingWines: false,
                wines: action.wines,
                error: null
            });
            if (newState.allWines.length === 0) {
                newState.allWines = action.wines;
            }
            return newState;

        case ActionType.RECEIVE_WINES_ERROR:
            return objectAssign({}, state, {
                isQueryingWines: false,
                error: 'failure'
            });

        case ActionType.REQUEST_ENTRY:
            return objectAssign({}, state, {
                isFetchingEntry: true
            });

        case ActionType.RECEIVE_ENTRY_SUCCESS:
            return objectAssign({}, state, {
                isFetchingEntry: false,
                entry: action.entry
            });

        case ActionType.RECEIVE_ENTRY_ERROR:
            return objectAssign({}, state, {
                isFetchingEntry: false,
                error: 'entry fetch failure'
            });

        default:
            return state;
    }
}
