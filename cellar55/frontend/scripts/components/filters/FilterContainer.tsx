import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from "classnames";

interface Props {
    isOpen: boolean;
    children?: React.ReactChildren;
}

@PureRender
export default class FilterContainer extends React.Component<Props, void> {

    render() {
        return (
            <div className={classNames("filter-container", {
                "closed": !this.props.isOpen
            })}>
                <div className="filter-header">
                    <h1>CELLAR 55</h1>
                </div>
                <div className="filter-body">{this.props.children}</div>
                <div className="filter-footer">
                    <ul>
                        <li><a href="https://sommselect.com" target="_blank">Sommselect</a></li>
                        <li>Terms</li>
                        <li>Privacy</li>
                    </ul>
                </div>
            </div>
        );
    }

}