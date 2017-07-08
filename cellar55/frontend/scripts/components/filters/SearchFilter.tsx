import * as React from "react";
import { SearchInput } from "../base/SearchInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export class SearchFilter extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <div className="search-filter-container">
        <SearchInput
          className="search-filter-input"
          value={this.props.value}
          onChange={evt => this.props.onChange(evt.currentTarget.value)}
          type="text"
          placeholder="Search within results..."
        />
      </div>
    );
  }
}
