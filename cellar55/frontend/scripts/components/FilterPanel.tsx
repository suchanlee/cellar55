import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { IFilter, IFilterDelta } from "../types/filter";
import { IWine } from "../types/wine";
import Filters from "./filters/Filters";

interface Props {
    wines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
    onFilterApply: () => void;
    onFilterClear: () => void;
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
