import { combineReducers, createStore, applyMiddleware, IStore } from "redux";
import * as thunkMiddleware from "redux-thunk";

import { IApp } from "../types/main";

import wineReducer from "../reducers/wineReducer";
import filterReducer from "../reducers/filterReducer";

const rootReducer = combineReducers({
    wine: wineReducer,
    filterState: filterReducer
});

const enhancers = applyMiddleware(thunkMiddleware["default"]);

export default function cellarStore(initialState: IApp): IStore<IApp> {
    return createStore(rootReducer, enhancers);
}
