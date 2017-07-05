import * as React from "react";
import * as classNames from "classnames";

import { WineType } from "../constants/Constants";

interface Props {
  wineType: string;
  className?: string;
}

export class WineTypeBox extends React.PureComponent<Props, {}> {

  public render() {
    const { wineType, className } = this.props;
    return (
      <div className={classNames("wine-type-box", className, {
        red: wineType.toUpperCase() === WineType.RED,
        rose: wineType.toUpperCase() === WineType.ROSE,
        sparkling: wineType.toUpperCase() === WineType.SPARKLING,
        white: wineType.toUpperCase() === WineType.WHITE,
      })} />
    );
  }
}
