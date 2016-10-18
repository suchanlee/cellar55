import * as React from "react";
import * as PureRender from "pure-render-decorator";
import * as classNames from "classnames";

import BaseFilter from "./BaseFilter";

interface Props {
    isFilterOpen: boolean;
    onFilterToggle: () => void;
}

@PureRender
export default class FilterToggle extends React.Component<Props, void> {

    private getFilterKey(): string {
        if (this.props.isFilterOpen) {
            return "Hide Filters";
        } else {
            return "Show Filters";
        }
    }

    render() {
        return (
            <BaseFilter filterKey={this.getFilterKey()}>
                <img
                    src="/static/images/arrow.png"
                    alt="toggle arrow"
                    className={classNames("filter-toggle-arrow", {
                        "rotated": this.props.isFilterOpen
                    })}
                    onClick={this.props.onFilterToggle}
                />
            </BaseFilter>
        );
    }
}
