import * as React from "react";
import { Link } from "react-router-dom";
import { IWine } from "../types/wine";
import {
  BaseWineItem,
  IWineItemProps,
  IWineName
} from "./base/BaseWineComponents";
import { WineTypeBox } from "./WineTypeBox";

export class WineItem extends BaseWineItem<IWineItemProps> {
  public render() {
    const wine: IWine = this.props.wine;
    const wineName: IWineName = this.getWineName();
    return (
      <li className="wine-item">
        <div className="wine-item-container">
          <div
            className="wine-item-image-container"
            style={{ backgroundImage: `url(https://${wine.alt_image_url})` }}
          >
            <Link to={`/wine/${wine.id}`} className="wine-item-image-link" />
          </div>
          <div className="wine-item-info">
            <WineTypeBox wineType={wine.wine_type} />
            <Link to={`/wine/${wine.id}`} className="wine-name-container">
              <div className="wine-name">
                {wineName.winery}
              </div>
              <div className="wine-name">
                {wineName.rest}
              </div>
            </Link>
            {this.renderWineMetadata()}
            <div className="wine-item-filler">css :(</div>
          </div>
        </div>
      </li>
    );
  }
}
