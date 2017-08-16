import * as React from "react";
import { filter } from "lodash";
import { selectWine, fetchEntry } from "../../actions/wineActions";
import { IWine } from "../../types/wine";

import { AdminWineSearch } from "./AdminWineSearch";
import { AdminWineList } from "./AdminWineList";

interface Props {
  wines: IWine[];
  selectedWineId: number | undefined;
  fetchEntry(entryId: number): void;
  selectWine(wine: IWine): void;
}

interface State {
  query: string;
}

export class AdminWinePanel extends React.PureComponent<Props, State> {
  public state: State = {
    query: ""
  };

  public render() {
    return (
      <div className="admin-wine-panel panel">
        <AdminWineSearch
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
        />
        <AdminWineList
          filteredWines={this.getFilteredWines()}
          selectWine={this.selectWine}
          selectedWineId={this.props.selectedWineId}
        />
      </div>
    );
  }

  private handleQueryChange = (query: string) => {
    this.setState({ query });
  };

  private selectWine = (wine: IWine) => {
    this.props.selectWine(wine);
    this.props.fetchEntry(wine.id);
  };

  private getFilteredWines(): IWine[] {
    const searchQuery = this.state.query.trim().toLowerCase();
    if (searchQuery.length === 0) {
      return this.props.wines;
    }
    const wines = filter(this.props.wines, wine => {
      const content = `${wine.name} ${wine.country} ${wine.region} ${wine.subregion}
       ${wine.varietal} ${wine.wine_type} ${wine.vintage}`.toLowerCase();
      return content.indexOf(searchQuery) > -1;
    });
    return wines;
  }
}
