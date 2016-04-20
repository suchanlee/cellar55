import { ActionType } from './ActionTypes';
import { IFilter } from '../types/filter';

export function changeFilter(filter: IFilter) {
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
