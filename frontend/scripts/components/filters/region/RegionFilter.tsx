import * as React from 'react';
import { map, chain } from 'lodash';

import * as Constants from '../../../constants/Constants';
import { IFilter, IFilterDelta } from '../../../types/filter';
import { IWine } from '../../../types/wine';
import { IRegion, RegionType } from '../../../types/region';

import BaseFilter from '../BaseFilter';
import RegionFilterSearch from './RegionFilterSearch';

const removalReg: RegExp = /\(.+\)|n\/a/g;
const splitReg: RegExp = /\,|\s+\-\s+/g;

interface Props {
    allWines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

export default class RegionFilter extends React.Component<Props, void> {

    private getAllRegions(): IRegion[] {
        return this.getSubregions().concat(this.getRegions()).concat(this.getCountries());
    }

    private getSubregions(): IRegion[] {
        return this.getRegionsForType(RegionType.SUBREGION);
    }

    private getCountries(): IRegion[] {
        return this.getRegionsForType(RegionType.COUNTRY);
    }

    private getRegions(): IRegion[] {
        return this.getRegionsForType(RegionType.REGION);
    }

    private getRegionsForType(type: RegionType): IRegion[] {
        const regions: string[] = map(this.props.allWines, (wine) => {
            let region: string = '';
            switch (type) {
                case RegionType.COUNTRY:
                    region = wine.country;
                    break;
                case RegionType.REGION:
                    region = wine.region;
                    break;
                case RegionType.SUBREGION:
                    region = wine.subregion;
                    break;
                default: //
            }
            return region.replace(removalReg, '').trim();
        });
        return chain(regions)
                .filter((region) => region.length > 0)
                .uniq()
                .join(',')
                .split(splitReg)
                .map((region) => region.trim())
                .uniq()
                .filter((region) => region.length > 0)
                .map<IRegion>((region) => {
                    return {
                        name: region,
                        type: type
                    };
                })
                .value();
    }

    render() {
        return (
            <BaseFilter filterKey='Region'>
                <RegionFilterSearch
                    filter={this.props.filter}
                    onFilterUpdate={this.props.onFilterUpdate}
                    regions={this.getAllRegions()}
                />
                Region filters:
                <ul>
                    {map(this.props.filter.regions, (region, idx) => (
                        <li key={idx}>{region.name}</li>
                    ))}
                </ul>
            </BaseFilter>
        );
    }
}
