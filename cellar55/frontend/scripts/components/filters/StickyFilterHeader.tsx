import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

import { IWine } from '../../types/wine';
import { IFilter, IFilterDelta } from '../../types/filter';
import StickyFilterToggleButton from "./StickyFilterToggleButton";
import Filters from "./Filters";
import StickyFilterHeaderList from "./StickyFilterHeaderList";

interface Props {
    wines: IWine[]
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
    onFilterApply: () => void;
    onFilterClear: () => void;
}

interface State {
    isFiltersShown: boolean;
}

@PureRender
export default class StickyFilterHeader extends React.Component<Props, State> {

    state: State = {
        isFiltersShown: false
    };

    private toggleFilterShown = () => {
        this.setState({ isFiltersShown: !this.state.isFiltersShown });
    }

    private isFilterEmpty(): boolean {
        const { filter } = this.props;
        return filter.wine_types.length === 0
                && filter.regions.length === 0
                && filter.varietals.length === 0
                && filter.vintage === ""
                && filter.vintage_from === ""
                && filter.vintage_to === "";
    }

    render() {
        return (
            <div className="sticky-filter-header-container">
                <div className="sticky-filter-header">
                    {this.isFilterEmpty() ? null : <StickyFilterHeaderList filter={this.props.filter} />}
                    <StickyFilterToggleButton
                        isShown={this.state.isFiltersShown}
                        onToggle={this.toggleFilterShown}
                    />
                    {this.state.isFiltersShown ?
                        <div className="sticky-filter-header-filter-container">
                            <Filters
                                wines={this.props.wines}
                                filter={this.props.filter}
                                onFilterUpdate={this.props.onFilterUpdate}
                                onFilterApply={this.props.onFilterApply}
                                onFilterClear={this.props.onFilterClear}
                            />
                        </div> :
                        null
                    }
                </div>
            </div>
        );

    }

}