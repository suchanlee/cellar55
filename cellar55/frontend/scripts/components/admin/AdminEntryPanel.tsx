import * as React from "react";
import * as PureRender from "pure-render-decorator";

import Loading from "../base/Loading";

interface Props {
    isFetchingEntry: boolean;
}

@PureRender
export default class AdminEntryPanel extends React.Component<Props, {}> {

    render() {
        let content: React.ReactElement<any>;
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
