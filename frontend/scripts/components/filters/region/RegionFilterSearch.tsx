import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from "classnames";
import { map, sortBy, findIndex } from 'lodash';

import * as Constants from '../../../constants/Constants';
import { IRegion, RegionType } from '../../../types/region';
import { IFilter, IFilterDelta } from '../../../types/filter';

import RegionSearchDropdown from './RegionSearchDropdown';
import { SearchInput } from '../../base/SearchInput';

const Keys = {
    ESC: 27,
    UP: 38,
    DOWN: 40,
    ENTER: 13
};

interface IRegionSearchEntry {
    region: IRegion;
    index: number;
}

interface Props {
    regions: IRegion[];
    filter: IFilter;
    toggleRegionFilter: (region: IRegion) => void;
}

interface State {
    query: string;
    selectedIdx: number;
    isDropdownShown: boolean;
    focus: boolean;
}

@PureRender
export default class RegionFilterSearch extends React.Component<Props, State> {

    state: State = {
        query: '',
        selectedIdx: 0,
        isDropdownShown: false,
        focus: false
    };

    private getMatchingRegions(): IRegion[] {
        const query: string = this.state.query.toLowerCase().trim();
        if (query.length === 0) {
            return [];
        }
        let searchEntries: IRegionSearchEntry[] = [];
        for (const region of this.props.regions) {
            const index: number = region.name.toLowerCase().indexOf(query);
            if (index > -1) {
                searchEntries.push({
                    region: region,
                    index: index
                });
            }
        }
        return map(sortBy(searchEntries, (entry) => entry.index), (entry) => entry.region);
    }

    private handleChange = (evt) => {
        this.setState({
            query: evt.target.value,
            selectedIdx: 0,
            isDropdownShown: true,
            focus: this.state.focus
        });
    }

    private handleInputKeyDown = (evt: React.KeyboardEvent) => {
        const keyCode = evt.keyCode;
        switch (keyCode) {
            case Keys.ESC:
                this.reset();
                break;
            case Keys.DOWN:
                const numMatchingRegions = this.getMatchingRegions().length;
                if (numMatchingRegions - 1 > this.state.selectedIdx) {
                    this.setState({ selectedIdx: this.state.selectedIdx + 1 } as State);
                }
                break;
            case Keys.UP:
                if (this.state.selectedIdx > 0) {
                    this.setState({ selectedIdx: this.state.selectedIdx - 1 } as State);
                }
                break;
            case Keys.ENTER:
                const region = this.getMatchingRegions()[this.state.selectedIdx];
                this.toggleRegionFilter(region);
                break;
            default:
        }
    }

    private handleItemMouseOver = (idx: number) => {
        this.setState({ selectedIdx: idx } as State);
    }

    private toggleRegionFilter = (region: IRegion) => {
        this.props.toggleRegionFilter(region);
        this.reset();
    }

    private reset = () => {
        this.setState({
            selectedIdx: 0,
            query: '',
            isDropdownShown: false,
            focus: this.state.focus
        });
    }

    private handleFocus = () => {
        this.setState({
            isDropdownShown: false,
            focus: true
         } as State);
    }

    private handleBlur = (evt: React.SyntheticEvent) => {
        this.setState({ focus: false } as State);
    }

    render() {
        return (
            <div className={classNames("region-search-container", {
                "focus": this.state.focus
            })}>
                <SearchInput
                    type="text"
                    className="region-search-input search-input"
                    placeholder="Search for regions..."
                    value={this.state.query}
                    onChange={this.handleChange}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                />
                <RegionSearchDropdown
                    ref="dropdown"
                    isShown={this.state.isDropdownShown}
                    regions={this.getMatchingRegions()}
                    onItemMouseOver={this.handleItemMouseOver}
                    onItemClick={this.toggleRegionFilter}
                    idx={this.state.selectedIdx}
                />
            </div>
        );
    }

}
