import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { map, sortBy, findIndex } from 'lodash';

import * as Constants from '../../../constants/Constants';
import { IRegion, RegionType } from '../../../types/region';
import { IFilter, IFilterDelta } from '../../../types/filter';

import RegionSearchDropdown from './RegionSearchDropdown';
import MagnifyingGlassIcon from '../../icons/MagnifyingGlassIcon';

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
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

interface State {
    query: string;
    selectedIdx: number;
    isDropdownShown: boolean;
}

@PureRender
export default class RegionFilterSearch extends React.Component<Props, State> {

    state: State = {
        query: '',
        selectedIdx: 0,
        isDropdownShown: false
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
            isDropdownShown: true
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
                this.addRegionFilter(region);
                break;
            default:
        }
    }

    private handleItemMouseOver = (idx: number) => {
        this.setState({ selectedIdx: idx } as State);
    }

    private addRegionFilter = (region: IRegion) => {
        let regions = this.props.filter.regions.slice();
        const index = findIndex(regions, (r) => r.name === region.name && r.type === region.type);
        if (index > -1) {
            regions.splice(index, 1);
        } else {
            regions.push(region);
        }
        this.props.onFilterUpdate({
            regions: regions
        });
        this.reset();
    }

    private reset = () => {
        this.setState({
            selectedIdx: 0,
            query: '',
            isDropdownShown: false
        });
    }

    render() {
        return (
            <div className="region-search-container">
                <MagnifyingGlassIcon />
                <input
                    type="text"
                    className="region-search-input"
                    value={this.state.query}
                    onChange={this.handleChange}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={() => this.setState({ isDropdownShown: false } as State)}
                    onFocus={() => this.setState({ isDropdownShown: true } as State)}
                />
                <RegionSearchDropdown
                    isShown={this.state.isDropdownShown}
                    regions={this.getMatchingRegions()}
                    onItemMouseOver={this.handleItemMouseOver}
                    onItemClick={this.addRegionFilter}
                    idx={this.state.selectedIdx}
                />
            </div>
        );
    }

}
