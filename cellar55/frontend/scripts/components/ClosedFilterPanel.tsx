import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { IFilter } from "../types/filter";

import ClosedFilters from "./filters/ClosedFilters";

interface Props {
    currentFilter: IFilter;
    isFilterOpen: boolean;
    onFilterToggle: () => void;
}

@PureRender
export default class ClosedFilterPanel extends React.Component<Props, void> {

    render() {
        return (
            <div className="panel closed filter-panel">
                <ClosedFilters {...this.props} />
            </div>
        );
    }
}
