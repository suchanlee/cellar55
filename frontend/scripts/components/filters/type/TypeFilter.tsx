import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { map } from "lodash";

import * as Constants from '../../../constants/Constants';
import { IFilter, IFilterDelta } from '../../../types/filter';
import { IWine } from '../../../types/wine';

import BaseFilter from '../BaseFilter';
import WineTypeBox from "../../WineTypeBox";
import { CheckboxInput } from "../../base/CheckboxInput";

interface Props {
    wines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

@PureRender
export default class TypeFilter extends React.Component<Props, void> {

    private handleWineTypeFilterClick(wineType: string): void {
        let wineTypes: string[] = this.props.filter.wine_types;
        const idx: number = wineTypes.indexOf(wineType);
        if (idx >= 0) {
            wineTypes.splice(idx, 1);
        } else {
            wineTypes.push(wineType);
        }
        this.props.onFilterUpdate({
            wine_types: wineTypes
        });
    }

    private getWineTypeFilters(): React.ReactElement<any>[] {
        let wineTypeFilters: React.ReactElement<any>[] = [];
        return map(Constants.WineTypes, (wineType) => (
            <span className='item wine-type-filter-item' key={wineType}>
                <CheckboxInput
                    checked={this.props.filter.wine_types.indexOf(wineType) >= 0}
                    onChange={() => this.handleWineTypeFilterClick(wineType)}
                />
                <WineTypeBox wineType={wineType} />
                {wineType === 'rose' ? 'rosé' : wineType}
            </span>
        ));
    }

    render() {
        return (
            <BaseFilter filterKey='Wine Types'>
                {this.getWineTypeFilters()}
            </BaseFilter>
        );
    }

}