import { combineReducers, createStore, applyMiddleware, Store } from "redux";
import * as thunkMiddleware from "redux-thunk";

import { IApp } from "../types/main";

import wineReducer from "../reducers/wineReducer";
import filterReducer from "../reducers/filterReducer";

const rootReducer = combineReducers<IApp>({
  filterState: filterReducer,
  wine: wineReducer
});

const enhancers = applyMiddleware(thunkMiddleware["default"]);

export function createCellarStore(): Store<IApp> {
  return createStore<IApp>(rootReducer, enhancers);
}
