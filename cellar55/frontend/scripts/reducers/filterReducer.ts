import objectAssign = require('object-assign');

import { initialState, emptyFilter } from '../initialState';
import { ActionType } from '../actions/ActionTypes';

export default function filterReducer(state = initialState.filterState, action) {
    switch (action.type) {
        case ActionType.CLEAR_FILTER:
            return objectAssign({}, state, {
                current: emptyFilter
            });

        case ActionType.CHANGE_FILTER:
            return objectAssign({}, state, {
                current: action.filter
            });

        case ActionType.REQUEST_WINES:
            return objectAssign({}, state, {
                initial: state.current
            });

        case ActionType.TOGGLE_FILTER:
            return objectAssign({}, state, {
                isOpen: !state.isOpen
            });

        default:
            return state;
    }
}
