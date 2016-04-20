import * as React from 'react';

import { IFilter, IFilterDelta } from '../../types/filter';
import { IWine } from '../../types/wine';

import TypeFilter from './TypeFilter';
import VarietalFilter from './VarietalFilter';
import RegionFilter from './RegionFilter';

interface Props {
    wines: IWine[];
    allWines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
    onFilterApply: () => void;
    onFilterClear: () => void;
}

export default class Filters extends React.Component<Props, void> {

    render() {
        return (
            <div className='filters'>
                <TypeFilter
                    wines={this.props.wines}
                    filter={this.props.filter}
                    onFilterUpdate={this.props.onFilterUpdate}
                />
                <VarietalFilter
                    allWines={this.props.allWines}
                    filter={this.props.filter}
                    onFilterUpdate={this.props.onFilterUpdate}
                />
                <RegionFilter
                    allWines={this.props.allWines}
                    filter={this.props.filter}
                    onFilterUpdate={this.props.onFilterUpdate}
                />
                <button onClick={() => this.props.onFilterApply()}>
                    Update Filters
                </button>
            </div>
        );
    }
}