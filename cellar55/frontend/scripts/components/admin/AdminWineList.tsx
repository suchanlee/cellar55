import * as React from "react";

import { map } from "lodash";

import { IWine } from "../../types/wine";
import { BaseWineList } from "../base/BaseWineComponents";
import { AdminWineItem } from "./AdminWineItem";

interface Props {
  selectedWineId: number | undefined;
  filteredWines: IWine[];
  selectWine: (wine: IWine) => void;
}

export class AdminWineList extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <BaseWineList
        wineIds={this.getWineIds()}
        wineItems={this.renderWineItems()}
      />
    );
  }

  private getWineIds(): number[] {
    return map(this.props.filteredWines, wine => wine.id);
  }

  private renderWineItems(): Array<React.ReactElement<any>> {
    return map(this.props.filteredWines, wine =>
      <AdminWineItem
        key={wine.id}
        wine={wine}
        selected={wine.id === this.props.selectedWineId}
        selectWine={this.props.selectWine}
      />
    );
  }
}
