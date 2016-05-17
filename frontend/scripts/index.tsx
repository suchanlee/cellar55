import '!style!css!less!../styles/main.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';

import { initialState } from './initialState';
import cellarStore from './stores/cellarStore';
import App from './components/App.tsx';

const store = cellarStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <Route path='wine/:wineId' component={App} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'));