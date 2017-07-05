import * as React from "react";
import { map } from "lodash";

import { IWine } from "../types/wine";
import { BaseWineList } from "./base/BaseWineComponents";
import { WineItem } from "./WineItem";

interface Props {
  filteredWines: IWine[];
}

export class WineList extends React.PureComponent<Props, {}> {

  public render() {
    return (
      <BaseWineList
        wineIds={this.getWineIds()}
        wineItems={this.renderWineItems()}
      />
    );
  }

  private getWineIds(): number[] {
    return map(this.props.filteredWines, (wine) => wine.id);
  }

  private renderWineItems(): JSX.Element[] {
    return map(this.props.filteredWines, (wine) =>
      <WineItem key={wine.id} wine={wine} />
    );
  }
}
