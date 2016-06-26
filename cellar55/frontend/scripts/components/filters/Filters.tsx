import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { chain, map, uniq } from "lodash";

import { IFilter, IFilterDelta } from '../../types/filter';
import { IWine } from '../../types/wine';

import TypeFilter from './type/TypeFilter';
import VarietalFilter from './varietal/VarietalFilter';
import RegionFilter from './region/RegionFilter';
import VintageFilter from './vintage/VintageFilter';

interface Props {
    wines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
    onFilterApply: () => void;
    onFilterClear: () => void;
}

@PureRender
export default class Filters extends React.Component<Props, void> {

    private getAllVintages(): string[] {
        const vintages = map(this.props.wines, (w) => w.vintage.trim());
        return chain(vintages)
                .filter((v) => v.length > 0)
                .uniq()
                .sortBy()
                .value()
    }

    render() {
        return (
            <div className='filters'>
                <TypeFilter
                    wines={this.props.wines}
                    filter={this.props.filter}
                    onFilterUpdate={this.props.onFilterUpdate}
                />
                <RegionFilter
                    wines={this.props.wines}
                    filter={this.props.filter}
                    onFilterUpdate={this.props.onFilterUpdate}
                />
                <VarietalFilter
                    wines={this.props.wines}
                    filter={this.props.filter}
                    onFilterUpdate={this.props.onFilterUpdate}
                />
                <VintageFilter
                    onFilterUpdate={this.props.onFilterUpdate}
                    filter={this.props.filter}
                    vintages={this.getAllVintages()}
                />
                <div className="filter-row filter-button-row">
                    <button
                        className="filter-update-button"
                        onClick={this.props.onFilterApply}
                    >
                        Update Filters
                    </button>
                </div>
            </div>
        );
    }
}