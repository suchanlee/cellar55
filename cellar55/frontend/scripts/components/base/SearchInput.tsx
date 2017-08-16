import * as React from "react";
import { MagnifyingGlassIcon } from "../icons/MagnifyingGlassIcon";

export class SearchInput extends React.PureComponent<
  React.HTMLProps<HTMLInputElement>
> {
  public render() {
    return (
      <div className="search-input-container">
        <MagnifyingGlassIcon />
        <input
          {...this.props}
          className={`search-input ${this.props.className}`}
        />
      </div>
    );
  }
}
