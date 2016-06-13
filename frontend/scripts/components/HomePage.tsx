import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import objectAssign = require('object-assign');
import { connect } from 'react-redux';

import { fetchWines } from '../actions/wineActions';
import { changeFilter, clearFilter } from '../actions/filterActions';
import { IApp } from '../types/main';
import { IFilter, IFilterDelta } from '../types/filter';
import { IWine } from '../types/wine';

import WineList from './WineList';
import Filters from './filters/Filters';
import SearchFilter from './filters/SearchFilter';

import * as actions from '../actions/wineActions';

interface Props {
    dispatch?: any;
    filter: IFilter;
    isQueryingWines: boolean;
    wines: IWine[];
    allWines: IWine[];
}

interface State {
    searchQuery: string;
}

@PureRender
class HomePage extends React.Component<Props, State> {

    state: State = {
        searchQuery: ''
    };

    componentDidMount() {
        if (this.props.allWines.length === 0) {
            const { dispatch, filter } = this.props;
            dispatch(fetchWines(filter));
        }
    }

    private handleFilterUpdate = (delta: IFilterDelta) => {
        const { dispatch } = this.props;
        dispatch(changeFilter(objectAssign({}, this.props.filter, delta)));
    }

    private handleFilterClear = () => {
        const { dispatch } = this.props;
        dispatch(clearFilter);
    }

    private handleFilterApply = () => {
        const { dispatch, filter } = this.props;
        dispatch(fetchWines(filter));
    }

    private handleSearchQueryChange = (value: string) => {
        this.setState({ searchQuery: value });
    }

    render() {
        return (
            <div>
                <div className="logo-container">
                    <h1 className="logo">fifty-five</h1>
                </div>
                <Filters
                    wines={this.props.wines}
                    allWines={this.props.allWines}
                    filter={this.props.filter}
                    onFilterUpdate={(delta: IFilterDelta) => this.handleFilterUpdate(delta)}
                    onFilterApply={this.handleFilterApply}
                    onFilterClear={this.handleFilterClear}
                 />
                 <SearchFilter
                    value={this.state.searchQuery}
                    onChange={this.handleSearchQueryChange}
                 />
                <WineList
                    wines={this.props.wines}
                    searchQuery={this.state.searchQuery}
                 />
            </div>
        )
    }
}

function mapStateToProps(state: IApp): Props {
    const { isQueryingWines, wines, allWines } = state.wine;
    return {
        filter: state.filter,
        isQueryingWines,
        wines,
        allWines
    };
}

export default connect(mapStateToProps)(HomePage);
