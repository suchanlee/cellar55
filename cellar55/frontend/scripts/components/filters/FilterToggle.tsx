import * as React from "react";
import * as classNames from "classnames";

import { BaseFilter } from "./BaseFilter";

interface Props {
  isFilterOpen: boolean;
  onFilterToggle: () => void;
}

export class FilterToggle extends React.PureComponent<Props, {}> {

  public render() {
    return (
      <BaseFilter filterKey={this.getFilterKey()}>
        <img
          src="/static/images/arrow.png"
          alt="toggle arrow"
          className={classNames("filter-toggle-arrow", {
            rotated: this.props.isFilterOpen,
          })}
          onClick={this.props.onFilterToggle}
        />
      </BaseFilter>
    );
  }

  private getFilterKey(): string {
    if (this.props.isFilterOpen) {
      return "Hide Filters";
    } else {
      return "Show Filters";
    }
  }
}
