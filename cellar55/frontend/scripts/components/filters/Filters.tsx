import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from "classnames";
import { chain, map, uniq, isEqual } from "lodash";

import { IFilterState, IFilterDelta } from '../../types/filter';
import { IWine } from '../../types/wine';

import FilterContainer from './FilterContainer';
import FilterToggle from './FilterToggle';
import TypeFilter from './type/TypeFilter';
import VarietalFilter from './varietal/VarietalFilter';
import RegionFilter from './region/RegionFilter';
import VintageFilter from './vintage/VintageFilter';

interface Props {
    wines: IWine[];
    filterState: IFilterState;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
    onFilterApply: () => void;
    onFilterClear: () => void;
    onFilterToggle: () => void;
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

    private handleApplyClick = () => {
        const filterState = this.props.filterState;
        if (!isEqual(filterState.initial, filterState.current)) {
            this.props.onFilterApply();
        }
    }

    render() {
        const filterState = this.props.filterState;
        return (
            <FilterContainer isOpen={this.props.filterState.isOpen}>
                <div className='filters'>
                    <FilterToggle
                        isFilterOpen={filterState.isOpen}
                        onFilterToggle={this.props.onFilterToggle}
                    />
                    <TypeFilter
                        wines={this.props.wines}
                        filter={filterState.current}
                        onFilterUpdate={this.props.onFilterUpdate}
                    />
                    <RegionFilter
                        wines={this.props.wines}
                        filter={filterState.current}
                        onFilterUpdate={this.props.onFilterUpdate}
                    />
                    <VarietalFilter
                        wines={this.props.wines}
                        filter={filterState.current}
                        onFilterUpdate={this.props.onFilterUpdate}
                    />
                    <VintageFilter
                        onFilterUpdate={this.props.onFilterUpdate}
                        filter={filterState.current}
                        vintages={this.getAllVintages()}
                    />
                    <div className="filter-button-container">
                        <button
                            className={classNames("filter-update-button", {
                                "changed": !isEqual(filterState.initial, filterState.current)
                            })}
                            onClick={this.handleApplyClick}
                        >
                            APPLY FILTERS
                        </button>
                        <span
                            className="filter-clear-button"
                            onClick={this.props.onFilterClear}
                        >
                            CLEAR ALL
                        </span>
                    </div>
                </div>
            </FilterContainer>
        );
    }
}