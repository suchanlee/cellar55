import * as React from "react";

import { IRegion } from "../../../types/region";

import { CrossIcon } from "../../icons/CrossIcon";

interface Props {
  region: IRegion;
  removeRegionFilter: (region: IRegion) => void;
}

export class RegionFilterItem extends React.PureComponent<Props, {}> {
  public render() {
    const { region } = this.props;
    return (
      <li className="region-filter-item">
        <div className="region-filter-item-data">
          <div className="region-filter-item-name">
            {region.name}
          </div>
        </div>
        <div
          className="region-filter-item-remove"
          onClick={this.handleCrossClick}
        >
          <CrossIcon />
        </div>
      </li>
    );
  }

  private handleCrossClick = () => {
    this.props.removeRegionFilter(this.props.region);
  };
}
