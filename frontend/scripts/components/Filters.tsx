import * as React from 'react';
import objectAssign = require('object-assign');

import * as Constants from '../constants/Constants';

interface Props {
    wines: Types.Wine[];
    filters: Types.Filters;
    onFiltersUpdate: (filtersDelta: Types.FiltersDelta) => void;
}

interface State {
    filters: Types.Filters;
}

export default class Filters extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            filters: objectAssign({}, this.props.filters)
        };
    }

    private handleWineTypeFilterClick(wineType: string): void {
        let wineTypes: string[] = this.state.filters.wine_types;
        const idx: number = wineTypes.indexOf(wineType);
        if (idx >= 0) {
            wineTypes.splice(idx, 1);
        } else {
            wineTypes.push(wineType);
        }
        this.setState({
            filters: objectAssign({}, this.state.filters, {
                wineTypes: wineTypes
            })
        });
    }

    private getWineTypeFilters(): React.ReactElement<any>[] {
        let wineTypeFilters: React.ReactElement<any>[] = [];
        for (var wineType of Constants.WineTypes) {
            wineTypeFilters.push(
                <span className='item' key={wineType}>
                    <input
                        type='checkbox'
                        checked={this.state.filters.wine_types.indexOf(wineType) >= 0}
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
                <button onClick={() => this.props.onFiltersUpdate(this.state.filters)}>
                    Update Filters
                </button>
            </div>
        );
    }
}