import * as React from 'react';
import { connect } from 'react-redux';

import { fetchWines } from '../actions/wineActions';
import HomePage from './HomePage';

interface Props {
    dispatch?: any;
    filter: Types.IFilter;
    isFetching: boolean;
    wines: Types.IWine[];
    currentWine: Types.IWine;
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

function mapStateToProps(state: Types.IApp): Props {
    const { isFetching, wines, currentWine } = state.wine;
    return {
        filter: state.filter,
        isFetching,
        wines,
        currentWine
    };
}

export default connect(mapStateToProps)(App);
