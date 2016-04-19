import * as React from 'react';

import TypeFilter from './TypeFilter';
import VarietalFilter from './VarietalFilter';

interface Props {
    wines: Types.IWine[];
    allWines: Types.IWine[];
    filter: Types.IFilter;
    onFilterUpdate: (filtersDelta: Types.IFilterDelta) => void;
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
                <button onClick={() => this.props.onFilterApply()}>
                    Update Filters
                </button>
            </div>
        );
    }
}