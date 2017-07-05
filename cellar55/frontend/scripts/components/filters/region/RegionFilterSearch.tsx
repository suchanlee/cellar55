import * as React from "react";
import * as classNames from "classnames";
import { map, sortBy } from "lodash";

import { IRegion } from "../../../types/region";
import { IFilter } from "../../../types/filter";

import { RegionSearchDropdown } from "./RegionSearchDropdown";

const Keys = {
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  UP: 38,
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

export class RegionFilterSearch extends React.PureComponent<Props, State> {

  public state: State = {
    focus: false,
    isDropdownShown: false,
    query: "",
    selectedIdx: 0,
  };

  public render() {
    return (
      <div className={classNames("region-search-container", {
        focus: this.state.focus,
      })}>
        <div className="search-input-container">
          <img className="search-icon" src={this.getInputIconSource()} />
          <input
            type="text"
            className="region-search-input search-input"
            placeholder="Search for regions..."
            value={this.state.query}
            onChange={this.handleChange}
            onKeyDown={this.handleInputKeyDown}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
        </div>
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

  private getMatchingRegions(): IRegion[] {
    const query: string = this.state.query.toLowerCase().trim();
    if (query.length === 0) {
      return [];
    }
    const searchEntries: IRegionSearchEntry[] = [];
    for (const region of this.props.regions) {
      const index: number = region.name.toLowerCase().indexOf(query);
      if (index > -1) {
        searchEntries.push({ index, region });
      }
    }
    return map(sortBy(searchEntries, (entry) => entry.index), (entry) => entry.region);
  }

  private handleChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      focus: this.state.focus,
      isDropdownShown: true,
      query: evt.currentTarget.value,
      selectedIdx: 0,
    });
  }

  private handleInputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = evt.keyCode;
    switch (keyCode) {
      case Keys.ESC:
        this.reset();
        break;
      case Keys.DOWN:
        const numMatchingRegions = this.getMatchingRegions().length;
        if (numMatchingRegions - 1 > this.state.selectedIdx) {
          this.setState({ selectedIdx: this.state.selectedIdx + 1 });
        }
        break;
      case Keys.UP:
        if (this.state.selectedIdx > 0) {
          this.setState({ selectedIdx: this.state.selectedIdx - 1 });
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
    this.setState({ selectedIdx: idx });
  }

  private toggleRegionFilter = (region: IRegion) => {
    this.props.toggleRegionFilter(region);
    this.reset();
  }

  private reset = () => {
    this.setState({
      focus: this.state.focus,
      isDropdownShown: false,
      query: "",
      selectedIdx: 0,
    });
  }

  private handleFocus = () => {
    this.setState({
      focus: true,
      isDropdownShown: false
     });
  }

  private handleBlur = () => {
    this.setState({ focus: false });
  }

  private getInputIconSource(): string {
    const baseSource = "/static/images/";
    if (this.state.focus) {
      return baseSource + "location-purple.png";
    } else {
      return baseSource + "location-bw.png";
    }
  }
}
