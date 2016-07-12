import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { isEqual, map } from "lodash";

import { toTitleCase } from "../../helpers/helpers";
import { emptyFilter } from "../../initialState";
import { IFilter } from '../../types/filter';

interface Props {
    filter: IFilter;
}

@PureRender
export default class SelectedFilters extends React.Component<Props, void> {

    private isEmptyFilter(): boolean {
        return isEqual(this.props.filter, emptyFilter);
    }

        private renderFilters(filterType: string, items: string[]): React.ReactElement<any> {
        if (items.length === 0) {
            return null;
        }
        return (
            <div className="selected-filter-group">
                <div className="selected-filter-group-type">{filterType}</div>
                {map(items, (item, idx) => <div key={idx} className="selected-filter-group-item">{item}</div>)}
            </div>
        );
    }

    private renderTypeFilters(): React.ReactElement<any> {
        const wineTypes = this.props.filter.wine_types;
        return this.renderFilters("wine types", wineTypes);
    }

    private renderRegionFilters(): React.ReactElement<any> {
        return this.renderFilters("regions", map(this.props.filter.regions, (r) => r.name));
    }

    private renderVarietalFilters(): React.ReactElement<any> {
        return this.renderFilters("varietals", map(this.props.filter.varietals, toTitleCase));
    }

    private renderVintageFilters(): React.ReactElement<any> {
        const { filter } = this.props;
        if (filter.vintage.length > 0) {
            return this.renderFilters("vintage", [filter.vintage]);
        } else if (filter.vintage_from.length > 0 || filter.vintage_to.length > 0) {
            return this.renderFilters("vintage", [`${filter.vintage_from}-${filter.vintage_to}`]);
        }
        return null;
    }

    render() {
        if (this.isEmptyFilter()) {
            return (
                <div className="selected-filters">
                    No filters selected
                </div>
            );
        }
        return (
            <div className="selected-filters">
                {this.renderTypeFilters()}
                {this.renderRegionFilters()}
                {this.renderVarietalFilters()}
                {this.renderVintageFilters()}
            </div>
        );
    }
}
