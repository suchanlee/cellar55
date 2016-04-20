import * as React from 'react';
import { connect } from 'react-redux';

import { fetchWines } from '../actions/wineActions';
import { IApp } from '../types/main';
import { IFilter } from '../types/filter';
import { IWine } from '../types/wine';

import HomePage from './HomePage';

interface Props {
    dispatch?: any;
    filter: IFilter;
    isFetching: boolean;
    wines: IWine[];
    allWines: IWine[];
    currentWine: IWine;
}

class App extends React.Component<Props, void> {

    componentDidMount() {
        const { dispatch, filter } = this.props;
        dispatch(fetchWines(filter));
    }

    render() {
        return <HomePage {...this.props} />;
    }
}

function mapStateToProps(state: IApp): Props {
    const { isFetching, wines, allWines, currentWine } = state.wine;
    return {
        filter: state.filter,
        isFetching,
        wines,
        allWines,
        currentWine
    };
}

export default connect(mapStateToProps)(App);
