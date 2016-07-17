import * as React from "react";
import * as PureRender from "pure-render-decorator";

interface Props {
    text?: string;
}

@PureRender
export default class  extends React.Component<Props, {}> {

    defaultProps = {
        text: "Fetching wines . . ."
    };

    render() {
        return (
            <div className="wine-loading-container">
                <img src="/static/images/loading.png" alt="Loading wines..." />
                <div className="wine-loading-text">{this.props.text}</div>
            </div>
        );
    }
}
