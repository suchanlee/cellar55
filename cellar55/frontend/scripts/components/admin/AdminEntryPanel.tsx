import * as React from "react";
import * as PureRender from "pure-render-decorator";

interface Props {

}

@PureRender
export default class AdminEntryPanel extends React.Component<Props, {}> {

    render() {
        return (
            <div className="admin-entry-panel panel">
                Entry panel
            </div>
        );
    }
}
