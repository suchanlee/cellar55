import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { map, chain, findIndex } from 'lodash';

import * as Constants from '../../../constants/Constants';
import { IFilter, IFilterDelta } from '../../../types/filter';
import { IWine } from '../../../types/wine';
import { IRegion, RegionType } from '../../../types/region';

import BaseFilter from '../BaseFilter';
import RegionFilterSearch from './RegionFilterSearch';
import RegionFilterItem from './RegionFilterItem';

const removalReg: RegExp = /\(.+\)|n\/a/g;
const splitReg: RegExp = /\,|\s+\-\s+/g;

interface Props {
    allWines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

@PureRender
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

    private toggleRegionFilter = (region: IRegion) => {
        let regions = this.props.filter.regions.slice();
        const index = findIndex(regions, (r) => r.name === region.name && r.type === region.type);
        if (index > -1) {
            regions.splice(index, 1);
        } else {
            regions.push(region);
        }
        this.props.onFilterUpdate({
            regions: regions
        });
    }

    render() {
        return (
            <BaseFilter filterKey='Region'>
                <RegionFilterSearch
                    filter={this.props.filter}
                    regions={this.getAllRegions()}
                    toggleRegionFilter={this.toggleRegionFilter}
                />
                {this.props.filter.regions.length > 0 ?
                    <ul className="region-filter-list">
                        {map(this.props.filter.regions, (region, idx) => (
                            <RegionFilterItem
                                key={idx}
                                region={region}
                                removeRegionFilter={this.toggleRegionFilter}
                            />
                        ))}
                    </ul> :
                    null
                }
            </BaseFilter>
        );
    }
}
