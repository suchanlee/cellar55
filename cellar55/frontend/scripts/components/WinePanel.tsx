import * as React from "react";
import * as classNames from "classnames";

import { IWine } from "../types/wine";
import { SearchFilter } from "./filters/SearchFilter";
import { WineList } from "./WineList";
import { Loading } from "./base/Loading";

interface Props {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  filteredWines: IWine[];
  isFilterOpen: boolean;
  isQueryingWines: boolean;
}

const pluralize = (word: string, count: number, postfix = "s") => {
  if (count > 1) {
    return word + postfix;
  }
  return word;
};

export class WinePanel extends React.PureComponent<Props, {}> {
  public render() {
    let content;
    let countText;
    if (this.props.isQueryingWines) {
      content = <Loading />;
      countText = "wines!";
    } else {
      content = <WineList filteredWines={this.props.filteredWines} />;
      countText = `${this.props.filteredWines.length} ${pluralize(
        "wine",
        this.props.filteredWines.length
      )}`;
    }
    return (
      <div
        className={classNames("panel wine-panel", {
          open: this.props.isFilterOpen
        })}
      >
        <div className="wine-panel-header">
          <SearchFilter
            value={this.props.searchQuery}
            onChange={this.props.onSearchQueryChange}
          />
          <span className="wine-count">
            {countText}
          </span>
        </div>
        {content}
      </div>
    );
  }
}
