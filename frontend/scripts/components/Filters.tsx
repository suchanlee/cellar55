import * as React from 'react';
import objectAssign = require('object-assign');

import * as Constants from '../constants/Constants';

interface Props {
    wines: Types.IWine[];
    filter: Types.IFilter;
    onFilterUpdate: (filtersDelta: Types.IFilterDelta) => void;
    onFilterApply: () => void;
    onFilterClear: () => void;
}

export default class Filters extends React.Component<Props, void> {

    private handleWineTypeFilterClick(wineType: string): void {
        let wineTypes: string[] = this.props.filter.wine_types;
        const idx: number = wineTypes.indexOf(wineType);
        if (idx >= 0) {
            wineTypes.splice(idx, 1);
        } else {
            wineTypes.push(wineType);
        }
        this.props.onFilterUpdate({
            wine_types: wineTypes
        });
    }

    private getWineTypeFilters(): React.ReactElement<any>[] {
        let wineTypeFilters: React.ReactElement<any>[] = [];
        for (var wineType of Constants.WineTypes) {
            wineTypeFilters.push(
                <span className='item' key={wineType}>
                    <input
                        type='checkbox'
                        checked={this.props.filter.wine_types.indexOf(wineType) >= 0}
                        onChange={this.handleWineTypeFilterClick.bind(this, wineType)}/>
                    {wineType === 'rose' ? 'rosé' : wineType}
                </span>
            )
        }
        return wineTypeFilters;
    }

    render() {
        return (
            <div className='filters'>
                <div className='filter-row'>
                    <div className="filter-row-key">Wine Type</div>
                    <div className="filter-row-values">{this.getWineTypeFilters()}</div>
                </div>
                <button onClick={() => this.props.onFilterApply()}>
                    Update Filters
                </button>
            </div>
        );
    }
}