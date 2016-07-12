import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { IFilterState, IFilterDelta } from "../types/filter";
import { IWine } from "../types/wine";
import Filters from "./filters/Filters";

interface Props {
    wines: IWine[];
    filterState: IFilterState;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
    onFilterApply: () => void;
    onFilterClear: () => void;
    onFilterToggle: () => void;
}

@PureRender
export default class FilterPanel extends React.Component<Props, void> {

    render() {
        return (
            <div className="panel filter-panel">
                <Filters {...this.props} />
            </div>
        );
    }
}
