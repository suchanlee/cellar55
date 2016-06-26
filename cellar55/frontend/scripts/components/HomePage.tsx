import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PureRender from 'pure-render-decorator';
import objectAssign = require('object-assign');
import { connect } from 'react-redux';
import { filter, defer, debounce } from "lodash";

import { fetchWines, fetchWinesWithNewFilter } from '../actions/wineActions';
import { changeFilter, clearFilter } from '../actions/filterActions';
import { IApp } from '../types/main';
import { IFilter, IFilterDelta } from '../types/filter';
import { IWine } from '../types/wine';

import Header from './Header';
import WineList from './WineList';
import Filters from './filters/Filters';
import StickyFilterHeader from './filters/StickyFilterHeader';
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
    isStickyHeaderShown: boolean;
}

@PureRender
class HomePage extends React.Component<Props, State> {

    state: State = {
        searchQuery: '',
        isStickyHeaderShown: false
    };

    private winelist: Element;
    private debouncedScrollHandler;

    componentDidMount() {
        if (this.props.wines.length === 0) {
            const { dispatch, filter } = this.props;
            dispatch(fetchWines(filter));
        }
        this.winelist = ReactDOM.findDOMNode(this.refs["winelist"]);
        this.debouncedScrollHandler = debounce(this.handlePageScroll, 50);
        window.addEventListener('scroll', this.handlePageScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlePageScroll);
    }

    private handlePageScroll = () => {
        if (document.body.scrollTop + 100 > this.winelist["offsetTop"]) {
            if (!this.state.isStickyHeaderShown) {
                this.setState({ isStickyHeaderShown: true } as State)
            }
        } else {
            if (this.state.isStickyHeaderShown) {
                this.setState({ isStickyHeaderShown: false } as State)
            }
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
         } as State);
    }

    render() {
        const filteredWines = this.getFilteredWines();
        return (
            <div>
                <Header />
                {this.state.isStickyHeaderShown ?
                    <StickyFilterHeader
                        wines={this.props.allWines}
                        filter={this.props.filter}
                        onFilterUpdate={this.handleFilterUpdate}
                        onFilterApply={this.handleFilterApply}
                        onFilterClear={this.handleFilterClear}
                    />  : null
                }
                <Filters
                    wines={this.props.allWines}
                    filter={this.props.filter}
                    onFilterUpdate={this.handleFilterUpdate}
                    onFilterApply={this.handleFilterApply}
                    onFilterClear={this.handleFilterClear}
                 />
                 <SearchFilter
                    value={this.state.searchQuery}
                    onChange={this.handleSearchQueryChange}
                 />
                <WineList
                    ref="winelist"
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
