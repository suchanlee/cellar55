import * as React from "react";
import { IRegion } from "../../../types/region";
import { RegionSearchItem } from "./RegionSearchItem";

interface Props {
  selectedRegions: IRegion[];
  regions: IRegion[];
  onItemMouseOver: (idx: number) => void;
  onItemClick: (region: IRegion) => void;
  index: number;
  isShown: boolean;
}

export class RegionSearchDropdown extends React.PureComponent<Props, {}> {
  public render() {
    if (this.props.regions.length === 0 || !this.props.isShown) {
      return null;
    }
    return (
      <ul className="region-search-dropdown">
        {this.props.regions.map((region, index) =>
          <RegionSearchItem
            key={`${region.name}-${region.type}`}
            index={index}
            region={region}
            selectedRegions={this.props.selectedRegions}
            selected={index === this.props.index}
            onClick={this.props.onItemClick}
            onMouseOver={this.props.onItemMouseOver}
          />
        )}
      </ul>
    );
  }
}
