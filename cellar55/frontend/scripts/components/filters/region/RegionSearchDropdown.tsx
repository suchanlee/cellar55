import * as React from "react";
import { map } from "lodash";

import { IRegion } from "../../../types/region";

import { RegionSearchItem } from "./RegionSearchItem";

interface Props {
  regions: IRegion[];
  onItemMouseOver: (idx: number) => void;
  onItemClick: (region: IRegion) => void;
  idx: number;
  isShown: boolean;
}


export class RegionSearchDropdown extends React.PureComponent<Props, {}> {

  public render() {
    if (this.props.regions.length === 0 || !this.props.isShown) {
      return null;
    }
    return (
      <ul className="region-search-dropdown">
        {map(this.props.regions, (region, idx) => (
          <RegionSearchItem
            key={idx}
            idx={idx}
            region={region}
            selected={idx === this.props.idx}
            onClick={this.props.onItemClick}
            onMouseOver={this.props.onItemMouseOver}
          />
        ))}
      </ul>
    );
  }
}
