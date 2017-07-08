import * as React from "react";
import * as classNames from "classnames";
import { map } from "lodash";

import * as Constants from "../../../constants/Constants";
import { IFilter, IFilterDelta } from "../../../types/filter";
import { IWine } from "../../../types/wine";

import { BaseFilter } from "../BaseFilter";
import { CheckboxInput } from "../../base/CheckboxInput";

interface Props {
  wines: IWine[];
  filter: IFilter;
  onFilterUpdate: (filtersDelta: IFilterDelta) => void; onFilterUpdatde?: (filtersDelta: IFilterDelta) => void;
}

export class TypeFilter extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <BaseFilter filterKey="Wine Types">
        {this.getWineTypeFilters()}
      </BaseFilter>
    );
  }

  private handleWineTypeFilterClick(wineType: string): void {
    const wineTypes: string[] = this.props.filter.wine_types.slice();
    const idx: number = wineTypes.indexOf(wineType);
    if (idx >= 0) {
      wineTypes.splice(idx, 1);
    } else {
      wineTypes.push(wineType);
    }
    this.props.onFilterUpdate({
      wine_types: wineTypes
    });
  }

  private getWineTypeFilters(): JSX.Element[] {
    return map(Constants.WineTypes, wineType => {
      const checked = this.props.filter.wine_types.indexOf(wineType) >= 0;
      return (
        <span
          className={classNames("item wine-type-filter-item", { checked })}
          key={wineType}
        >
          <CheckboxInput
            checked={checked}
            onChange={() => this.handleWineTypeFilterClick(wineType)}
          >
            {wineType === "Rose" ? "Rosé" : wineType}
          </CheckboxInput>
        </span>
      );
    });
  }
}
