import * as React from "react";

interface Props {
  text?: string;
}

export class Loading extends React.PureComponent<Props, {}> {

  public defaultProps = {
    text: "Fetching wines . . ."
  };

  public render() {
    return (
      <div className="wine-loading-container">
        <img src="/static/images/loading.png" alt="Loading wines..." />
        <div className="wine-loading-text">{this.props.text}</div>
      </div>
    );
  }
}
