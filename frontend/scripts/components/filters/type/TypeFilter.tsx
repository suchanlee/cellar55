import * as React from 'react';

import * as Constants from '../../../constants/Constants';
import { IFilter, IFilterDelta } from '../../../types/filter';
import { IWine } from '../../../types/wine';

import BaseFilter from '../BaseFilter';

interface Props {
    wines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

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
        for (var wineType of Constants.WineTypes) {
            wineTypeFilters.push(
                <span className='item' key={wineType}>
                    <input
                        type='checkbox'
                        checked={this.props.filter.wine_types.indexOf(wineType) >= 0}
                        onChange={this.handleWineTypeFilterClick.bind(this, wineType)}
                    />
                    {wineType === 'rose' ? 'rosé' : wineType}
                </span>
            )
        }
        return wineTypeFilters;
    }

    render() {
        return (
            <BaseFilter filterKey='Wine Types'>
                {this.getWineTypeFilters()}
            </BaseFilter>
        );
    }

}