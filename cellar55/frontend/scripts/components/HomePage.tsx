import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PureRender from "pure-render-decorator";
import objectAssign = require("object-assign");
import { connect } from "react-redux";
import { filter, defer, debounce } from "lodash";

import { fetchWines, fetchWinesWithNewFilter } from "../actions/wineActions";
import { changeFilter, clearFilter, toggleFilter } from "../actions/filterActions";
import { IApp } from "../types/main";
import { IFilter, IFilterDelta, IFilterState } from "../types/filter";
import { IWine } from "../types/wine";
import { emptyFilter } from "../initialState"

import Header from "./Header";
import WineList from "./WineList";
import Filters from "./filters/Filters";
import SearchFilter from "./filters/SearchFilter";
import FilterPanel from "./FilterPanel";
import WinePanel from "./WinePanel";
import ClosedFilterPanel from "./ClosedFilterPanel";

import * as actions from "../actions/wineActions";

interface Props {
    dispatch?: any;
    filterState: IFilterState;
    isQueryingWines: boolean;
    wines: IWine[];
    allWines: IWine[];
}

interface State {
    searchQuery: string
}

@PureRender
class HomePage extends React.Component<Props, State> {

    state: State = {
        searchQuery: ""
    };

    componentWillMount() {
        document.title = "Cellar 55";
    }

    componentDidMount() {
        if (this.props.wines.length === 0) {
            const { dispatch, filterState } = this.props;
            dispatch(fetchWines(filterState.current));
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
        this.props.dispatch(changeFilter(objectAssign({}, this.props.filterState.current, delta)));
    }

    private handleFilterClear = () => {
        const { dispatch } = this.props;
        dispatch(clearFilter());
        dispatch(fetchWinesWithNewFilter(emptyFilter));
    }

    private handleFilterApply = () => {
        const { dispatch, filterState } = this.props;
        dispatch(fetchWinesWithNewFilter(filterState.current));
    }

    private handleFilterToggle = () => {
        this.props.dispatch(toggleFilter());
    }

    private handleSearchQueryChange = (value: string) => {
        this.setState({
            searchQuery: value
         } as State);
    }

    render() {
        const filteredWines = this.getFilteredWines();
        return (
            <div className="panel-container">
                {this.props.filterState.isOpen ?
                    <FilterPanel
                        wines={this.props.allWines}
                        filterState={this.props.filterState}
                        onFilterUpdate={this.handleFilterUpdate}
                        onFilterApply={this.handleFilterApply}
                        onFilterClear={this.handleFilterClear}
                        onFilterToggle={this.handleFilterToggle}
                    /> :
                    <ClosedFilterPanel
                        currentFilter={this.props.filterState.current}
                        onFilterToggle={this.handleFilterToggle}
                        isFilterOpen={this.props.filterState.isOpen}
                    />
                }
                 <WinePanel
                    filteredWines={filteredWines}
                    searchQuery={this.state.searchQuery}
                    onSearchQueryChange={this.handleSearchQueryChange}
                    isFilterOpen={this.props.filterState.isOpen}
                    isQueryingWines={this.props.isQueryingWines}
                 />
            </div>
        )
    }
}

function mapStateToProps(state: IApp): Props {
    const { isQueryingWines, wines, allWines } = state.wine;
    return {
        filterState: state.filterState,
        isQueryingWines,
        wines,
        allWines
    };
}

export default connect(mapStateToProps)(HomePage);
