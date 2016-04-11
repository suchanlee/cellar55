import '!style!css!less!../styles/main.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { initialState } from './initialState';
import cellarStore from './stores/cellarStore';
import App from './components/App.tsx';

const store = cellarStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'));