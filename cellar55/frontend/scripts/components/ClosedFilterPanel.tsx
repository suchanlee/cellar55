import * as React from "react";

import { IFilter } from "../types/filter";

import { ClosedFilters } from "./filters/ClosedFilters";

interface Props {
  currentFilter: IFilter;
  isFilterOpen: boolean;
  onFilterToggle: () => void;
}

export class ClosedFilterPanel extends React.PureComponent<Props, {}> {

  public render() {
    return (
      <div className="panel closed filter-panel">
        <ClosedFilters {...this.props} />
      </div>
    );
  }
}
