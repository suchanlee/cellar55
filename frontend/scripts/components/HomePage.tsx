import * as React from 'react';
import objectAssign = require('object-assign');

import { fetchWines } from '../actions/wineActions';
import { changeFilter, clearFilter } from '../actions/filterActions';

import Filters from './Filters';
import WineItem from './WineItem';

import * as actions from '../actions/wineActions';

interface Props {
    dispatch: any;
    filter: Types.IFilter;
    isFetching: boolean;
    wines: Types.IWine[];
    currentWine: Types.IWine;
}

export default class HomePage extends React.Component<Props, void> {

    private handleFilterUpdate(delta: Types.IFilterDelta): void {
        const { dispatch } = this.props;
        dispatch(changeFilter(objectAssign({}, this.props.filter, delta)));
    }

    private handleFilterClear(): void {
        const { dispatch } = this.props;
        dispatch(clearFilter);
    }

    private handleFilterApply(): void {
        const { dispatch, filter } = this.props;
        dispatch(fetchWines(filter));
    }

    private renderWineItems(): React.ReactElement<any>[] {
        let wineItems: React.ReactElement<any>[] = [];
        for (var wine of this.props.wines) {
            wineItems.push(<WineItem key={wine.id} wine={wine} />)
        }
        return wineItems;
    }

    render() {
        return (
            <div>
                <Filters
                    wines={this.props.wines}
                    filter={this.props.filter}
                    onFilterUpdate={(delta: Types.IFilterDelta) => this.handleFilterUpdate(delta)}
                    onFilterApply={() => this.handleFilterApply()}
                    onFilterClear={() => this.handleFilterClear()}
                 />
                <ul className='wine-list'>
                    {this.renderWineItems()}
                </ul>
            </div>
        )
    }
}
