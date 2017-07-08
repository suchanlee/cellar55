import "whatwg-fetch";
import queryString = require("query-string");
import { map, filter } from "lodash";
import { Dispatch } from "redux";
import { IApp } from "../types/main";
import { IFilter, IRequestFilter } from "../types/filter";
import { IWine, IWineResponse, IEntryResponse } from "../types/wine";
import { IRegion, RegionType } from "../types/region";
import { ActionType } from "./ActionTypes";

const baseUrl: string = "/api/wine";

function requestWines(filter: IFilter) {
  return {
    filter,
    type: ActionType.REQUEST_WINES
  };
}

function receiveWinesSuccess(wineResponse: IWineResponse) {
  return {
    count: wineResponse.count,
    type: ActionType.RECEIVE_WINES_SUCCESS,
    wines: wineResponse.wines
  };
}

function receiveWinesError(error: Response) {
  return {
    error,
    type: ActionType.RECEIVE_WINES_ERROR
  };
}

function requestEntry(id: number) {
  return {
    id,
    type: ActionType.REQUEST_ENTRY
  };
}

function receiveEntrySuccess(res: IEntryResponse) {
  return {
    res,
    type: ActionType.RECEIVE_ENTRY_SUCCESS
  };
}

function receiveEntryError(error: Response) {
  return {
    error,
    type: ActionType.RECEIVE_ENTRY_ERROR
  };
}

function asyncFetchWines(filter: IFilter) {
  return (dispatch: Dispatch<IApp>) => {
    dispatch(requestWines(filter));
    return fetch(
      `${baseUrl}?${queryString.stringify(convertToRequestFilter(filter))}`
    )
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data: IWineResponse) => dispatch(receiveWinesSuccess(data)))
      .catch(error => dispatch(receiveWinesError(error)));
  };
}

function asyncFetchEntry(id: number) {
  return (dispatch: Dispatch<IApp>) => {
    dispatch(requestEntry(id));
    return fetch(`${baseUrl}/${id}`)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data: IEntryResponse) => dispatch(receiveEntrySuccess(data)))
      .catch(error => receiveEntryError(error));
  };
}

function convertToRequestFilter(f: IFilter): IRequestFilter {
  const countries = map<IRegion, string>(
    filter(f.regions, r => r.type === RegionType.COUNTRY),
    "name"
  );
  const regions = map<IRegion, string>(
    filter(f.regions, r => r.type === RegionType.REGION),
    "name"
  );
  const subregions = map<IRegion, string>(
    filter(f.regions, r => r.type === RegionType.SUBREGION),
    "name"
  );
  return {
    countries,
    name: f.name,
    regions,
    subregions,
    varietals: f.varietals,
    vintage: f.vintage,
    vintage_from: f.vintage_from,
    vintage_to: f.vintage_to,
    wine_types: f.wine_types
  };
}

export function fetchWines(filter: IFilter) {
  return (dispatch: Dispatch<IApp>, getState: () => IApp) => {
    const state = getState();
    if (state.wine.allWines.length === 0) {
      dispatch(asyncFetchWines(filter));
    }
  };
}

export function fetchWinesWithNewFilter(filter: IFilter) {
  return (dispatch: Dispatch<IApp>) => {
    dispatch(asyncFetchWines(filter));
  };
}

export function fetchEntry(id: number) {
  return (dispatch: Dispatch<IApp>) => dispatch(asyncFetchEntry(id));
}

export function selectWine(wine: IWine) {
  return {
    type: ActionType.SELECT_WINE,
    wine
  };
}
