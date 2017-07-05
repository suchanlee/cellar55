import objectAssign = require("object-assign");

import { IWineState } from "../types/wine";

import { initialState } from "../initialState";
import { ActionType } from "../actions/ActionTypes";

export default function wineReducer(state: IWineState = initialState.wine, action: any) {
  switch (action.type) {

    case ActionType.SELECT_WINE:
      return objectAssign({}, state, {
        selectedWine: action.wine,
      });

    case ActionType.REQUEST_WINES:
      return objectAssign({}, state, {
        isQueryingWines: true,
        wines: [],
      });

    case ActionType.RECEIVE_WINES_SUCCESS:
      const newState = objectAssign({}, state, {
        error: null,
        isQueryingWines: false,
        wines: action.wines,
      });
      if (newState.allWines.length === 0) {
        newState.allWines = action.wines;
      }
      return newState;

    case ActionType.RECEIVE_WINES_ERROR:
      return objectAssign({}, state, {
        error: "failure",
        isQueryingWines: false,
      });

    case ActionType.REQUEST_ENTRY:
      return objectAssign({}, state, {
        isFetchingEntry: true,
      });

    case ActionType.RECEIVE_ENTRY_SUCCESS:
      return objectAssign({}, state, {
        entry: action.res.entry,
        isFetchingEntry: false,
        selectedWine: action.res.wine,
      });

    case ActionType.RECEIVE_ENTRY_ERROR:
      return objectAssign({}, state, {
        error: "entry fetch failure",
        isFetchingEntry: false,
      });

    default:
      return state;
  }
}
