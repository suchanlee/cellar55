import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { IFilter } from "../../types/filter";

import FilterContainer from './FilterContainer';
import FilterToggle from "./FilterToggle";
import SelectedFilters from "./SelectedFilters";

interface Props {
    currentFilter: IFilter;
    onFilterToggle: () => void;
    isFilterOpen: boolean;
}

@PureRender
export default class ClosedFilters extends React.Component<Props, void> {

    render() {
        return (
            <FilterContainer isOpen={this.props.isFilterOpen}>
                <div className='filters'>
                    <FilterToggle
                        isFilterOpen={false}
                        onFilterToggle={this.props.onFilterToggle}
                    />
                    <SelectedFilters
                        filter={this.props.currentFilter}
                    />
                </div>
            </FilterContainer>
        );
    }
}
