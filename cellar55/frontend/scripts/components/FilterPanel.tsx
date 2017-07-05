import * as React from "react";

import { IFilterState, IFilterDelta } from "../types/filter";
import { IWine } from "../types/wine";
import { Filters } from "./filters/Filters";

interface Props {
  wines: IWine[];
  filterState: IFilterState;
  onFilterUpdate: (filtersDelta: IFilterDelta) => void;
  onFilterApply: () => void;
  onFilterClear: () => void;
  onFilterToggle: () => void;
}


export class FilterPanel extends React.PureComponent<Props, {}> {

  public render() {
    return (
      <div className="panel filter-panel">
        <Filters {...this.props} />
      </div>
    );
  }
}
