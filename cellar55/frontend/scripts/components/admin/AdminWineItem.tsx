import * as React from "react";
import * as classNames from "classnames";
import { IWine } from "../../types/wine";
import { BaseWineItem, IWineItemProps, IWineName } from "../base/BaseWineComponents";
import { WineTypeBox } from "../WineTypeBox";

interface Props extends IWineItemProps {
  selected: boolean;
  selectWine: (wine: IWine) => void;
}

export class AdminWineItem extends BaseWineItem<Props> {

  public render() {
    const wine: IWine = this.props.wine;
    const wineName: IWineName = this.getWineName();
    return (
      <li
        className={classNames("wine-item", {
          selected: this.props.selected
        })}
        onClick={this.handleClick}
      >
        <div className="wine-item-container">
          <div className="wine-item-info">
            <WineTypeBox wineType={wine.wine_type} />
            <div className="wine-name-container">
              <div className="wine-name">{wineName.winery}</div>
              <div className="wine-name">{wineName.rest}</div>
            </div>
            {this.renderWineMetadata()}
          </div>
        </div>
      </li>
    );
  }

  private handleClick = () => {
    this.props.selectWine(this.props.wine);
  }
}
