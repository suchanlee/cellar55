import { combineReducers, createStore, applyMiddleware, IMiddleware, IStore } from 'redux';
import * as thunkMiddleware from 'redux-thunk';
import * as ReactRouterRedux from 'react-router-redux';

import wineReducer from '../reducers/wineReducer';
import filterReducer from '../reducers/filterReducer';

const rootReducer = combineReducers({
    wine: wineReducer,
    filter: filterReducer,
    routing: ReactRouterRedux.routerReducer
});

const enhancers = applyMiddleware(thunkMiddleware['default']);

export default function cellarStore(initialState: Types.IApp): IStore<Types.IApp> {
    return createStore(rootReducer, enhancers);
}
