import { ActionType } from "./ActionTypes";
import { IFilter } from "../types/filter";

export function setFilter(filter: IFilter) {
  return {
    filter,
    type: ActionType.CHANGE_FILTER
  };
}

export function clearFilter() {
  return {
    type: ActionType.CLEAR_FILTER
  };
}

export function toggleFilter() {
  return {
    type: ActionType.TOGGLE_FILTER
  };
}
