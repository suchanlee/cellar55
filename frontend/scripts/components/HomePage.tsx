import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import objectAssign = require('object-assign');
import { connect } from 'react-redux';
import { filter, defer } from "lodash";

import { fetchWines, fetchWinesWithNewFilter } from '../actions/wineActions';
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
        if (this.props.wines.length === 0) {
            const { dispatch, filter } = this.props;
            dispatch(fetchWines(filter));
        }
    }

    private getFilteredWines(): IWine[] {
        const searchQuery = this.state.searchQuery.trim().toLowerCase();
        if (searchQuery.length === 0) {
            return this.props.wines;
        }
        const wines = filter(this.props.wines, (wine) => {
            const content = `${wine.name} ${wine.country} ${wine.region} ${wine.subregion}
             ${wine.varietal} ${wine.wine_type} ${wine.vintage}`.toLowerCase();
             return content.indexOf(searchQuery) > - 1;
        });
        return wines;
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
        dispatch(fetchWinesWithNewFilter(filter));
    }

    private handleSearchQueryChange = (value: string) => {
        this.setState({
            searchQuery: value
         });
    }

    render() {
        const filteredWines = this.getFilteredWines();
        return (
            <div>
                <div className="logo-container">
                    <h1 className="logo">fifty-five</h1>
                </div>
                <Filters
                    wines={this.props.allWines}
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
                    filteredWines={filteredWines}
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
