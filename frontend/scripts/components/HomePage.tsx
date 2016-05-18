import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import objectAssign = require('object-assign');
import { connect } from 'react-redux';

import { fetchWines } from '../actions/wineActions';
import { changeFilter, clearFilter } from '../actions/filterActions';
import { IApp } from '../types/main';
import { IFilter, IFilterDelta } from '../types/filter';
import { IWine } from '../types/wine';

import Filters from './filters/Filters';
import SearchFilter from './filters/SearchFilter';
import WineItem from './WineItem';

import * as actions from '../actions/wineActions';

interface Props {
    dispatch?: any;
    filter: IFilter;
    isFetching: boolean;
    wines: IWine[];
    allWines: IWine[];
    currentWine: IWine;
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

    private renderWineItems(): React.ReactElement<any>[] {
        const query = this.state.searchQuery.toLowerCase().trim();
        let wineItems: React.ReactElement<any>[] = [];
        for (var wine of this.props.wines) {
            const content = `${wine.name} ${wine.country} ${wine.region} ${wine.subregion}
             ${wine.varietal} ${wine.wine_type} ${wine.vintage}`.toLowerCase();
            if (content.indexOf(this.state.searchQuery) > -1) {
                wineItems.push(<WineItem key={wine.id} wine={wine} />)
            }
        }
        return wineItems;
    }

    render() {
        return (
            <div>
                <Filters
                    wines={this.props.wines}
                    allWines={this.props.allWines}
                    filter={this.props.filter}
                    onFilterUpdate={(delta: IFilterDelta) => this.handleFilterUpdate(delta)}
                    onFilterApply={() => this.handleFilterApply()}
                    onFilterClear={() => this.handleFilterClear()}
                 />
                 <SearchFilter
                    value={this.state.searchQuery}
                    onChange={this.handleSearchQueryChange}
                 />
                <ul className='wine-list'>
                    {this.renderWineItems()}
                </ul>
            </div>
        )
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

export default connect(mapStateToProps)(HomePage);
