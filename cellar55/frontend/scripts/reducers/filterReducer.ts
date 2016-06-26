import objectAssign = require('object-assign');

import { initialState, emptyFilter } from '../initialState';
import { ActionType } from '../actions/ActionTypes';

export default function filterReducer(state = initialState.filter, action) {
    switch (action.type) {
        case ActionType.CLEAR_FILTER:
            return emptyFilter;
        case ActionType.CHANGE_FILTER:
            return action.filter;
        default:
            return state;
    }
}
