import * as React from "react";
import * as PureRender from "pure-render-decorator";

interface Props {
    filterKey: string;
    children?: React.ReactChildren;
}

@PureRender
export default class BaseFilter extends React.Component<Props, void> {

    render() {
        return (
            <div className="filter-row">
                <div className="filter-row-key">{this.props.filterKey}</div>
                <div className="filter-row-values">{this.props.children}</div>
            </div>
        );
    }
}
