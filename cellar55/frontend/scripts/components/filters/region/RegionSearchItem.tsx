import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classNames from "classnames";
import { find } from "lodash";
import { IRegion } from "../../../types/region";
import { getRegionType } from "../../../helpers/helpers";

interface Props {
  index: number;
  region: IRegion;
  selectedRegions: IRegion[];
  selected: boolean;
  onClick: (region: IRegion) => void;
  onMouseOver: (index: number) => void;
}

export class RegionSearchItem extends React.PureComponent<Props, {}> {
  private row: any;

  public componentDidMount() {
    this.row = ReactDOM.findDOMNode(this.refs["row"]);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (!this.props.selected && nextProps.selected) {
      this.row.scrollIntoViewIfNeeded(false);
    }
  }

  public render() {
    return (
      <div
        ref="row"
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        className={classNames("region-search-item", {
          selected: this.props.selected
        })}
      >
        <div className="region-search-item-name">
          {this.props.region.name}
        </div>
        <div className="region-search-item-type">
          {getRegionType(this.props.region.type)}
        </div>
        {this.isRegionSelected() && <span className="region-search-item-dot" />}
      </div>
    );
  }

  private handleClick = () => {
    this.props.onClick(this.props.region);
  };

  private handleMouseOver = () => {
    this.props.onMouseOver(this.props.index);
  };

  private isRegionSelected() {
    const { region, selectedRegions } = this.props;
    return (
      find(
        selectedRegions,
        r => r.name === region.name && r.type === region.type
      ) != null
    );
  }
}
