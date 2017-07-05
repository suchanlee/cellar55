import * as React from "react";
import { SearchInput } from "../base/SearchInput";

export interface AdminWineSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export class AdminWineSearch extends React.PureComponent<AdminWineSearchProps, {}> {

  public render() {
    return (
      <div className="admin-wine-search">
        <SearchInput
          className="admin-wine-search-input"
          value={this.props.query}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  private handleChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.onQueryChange(evt.currentTarget.value);
  }
}
