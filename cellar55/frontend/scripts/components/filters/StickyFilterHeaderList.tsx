import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { map, isString } from "lodash";

import { IFilter, IFilterDelta } from '../../types/filter';
import WineTypeBox from "../WineTypeBox";

interface Props {
    filter: IFilter;
}

@PureRender
export default class StickyFilterHeaderList extends React.Component<Props, void> {

    private renderFilters(filterType: string, items: string[] | React.ReactElement<any>[]): React.ReactElement<any> {
        if (items.length === 0) {
            return null;
        }
        return (
            <div className="sticky-filter-header-list">
                <span>{filterType}: </span>
                {isString(items[0]) ? items.join(", ") : items}
            </div>
        );
    }

    private renderTypeFilters(): React.ReactElement<any> {
        const wineTypes = this.props.filter.wine_types;
        return this.renderFilters("wine types", map(wineTypes, (type) => (
            <span className="sticky-filter-header-wine-type sticky-filter-header-list-item" key={type}>
                <WineTypeBox wineType={type} />
                {type}
            </span>
        )));
    }

    private renderRegionFilters(): React.ReactElement<any> {
        return this.renderFilters("regions", map(this.props.filter.regions, (r) => r.name));
    }

    private renderVarietalFilters(): React.ReactElement<any> {
        return this.renderFilters("varietals", this.props.filter.varietals);
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
        return (
            <div className="sticky-filter-header-list-container center-align">
                {this.renderTypeFilters()}
                {this.renderRegionFilters()}
                {this.renderVarietalFilters()}
                {this.renderVintageFilters()}
            </div>
        )
    }

}