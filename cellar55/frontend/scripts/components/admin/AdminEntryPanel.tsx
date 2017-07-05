import * as React from "react";
import { Loading } from "../base/Loading";

interface Props {
  isFetchingEntry: boolean;
}

export class AdminEntryPanel extends React.PureComponent<Props, {}> {

  public render() {
    let content: React.ReactNode;
    if (this.props.isFetchingEntry) {
      content = <Loading text="Fetching entry. . ." />;
    }
    return (
      <div className="admin-entry-panel panel">
        {content}
      </div>
    );
  }
}
