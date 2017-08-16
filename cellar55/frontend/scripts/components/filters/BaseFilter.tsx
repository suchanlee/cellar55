import * as React from "react";

interface Props {
  filterKey: string;
}

export class BaseFilter extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <div className="filter-row">
        <div className="filter-row-key">
          {this.props.filterKey}
        </div>
        <div className="filter-row-values">
          {this.props.children}
        </div>
      </div>
    );
  }
}
