import { ActionType } from './ActionTypes';

export function changeFilter(filter: Types.IFilter) {
    return {
        type: ActionType.CHANGE_FILTER,
        filter
    };
}

export function clearFilter() {
    return {
        type: ActionType.CLEAR_FILTER
    };
}

export function applyFilter() {
    return {
        type: ActionType.APPLY_FILTER
    };
}
