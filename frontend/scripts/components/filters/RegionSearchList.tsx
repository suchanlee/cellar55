import * as React from 'react';
import { map, sortBy } from 'lodash';

import * as Constants from '../../constants/Constants';
import { IRegion, RegionType } from '../../types/region';
import { IFilter, IFilterDelta } from '../../types/filter';

import BaseFilter from './BaseFilter';

const removalReg: RegExp = /\(.+\)|n\/a/g;
const splitReg: RegExp = /\,|\s+\-\s+/g;

interface RegionSearchEntry {
    region: IRegion;
    index: number;
}

interface Props {
    query: string;
    regions: IRegion[];
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

export default class RegionSearchList extends React.Component<Props, void> {

    private getMatchingRegions(): IRegion[] {
        const query: string = this.props.query.toLowerCase().trim();
        if (query.length === 0) {
            return [];
        }
        let searchEntries: RegionSearchEntry[] = [];
        for (const region of this.props.regions) {
            const index: number = region.name.toLowerCase().indexOf(query);
            if (index > -1) {
                searchEntries.push({
                    region: region,
                    index: index
                });
            }
        }
        return map(sortBy(searchEntries, (entry) => entry.index), (entry) => entry.region);
    }

    private getRegionItem(region: IRegion): React.ReactElement<any> {
        let regionType: string = '';
        switch (region.type) {
            case RegionType.COUNTRY:
                regionType = 'Country';
                break;
            case RegionType.REGION:
                regionType = 'Region';
                break;
            case RegionType.SUBREGION:
                regionType = 'Subregion';
                break;
            default:
        }
        return <span>{regionType}: {region.name}</span>
    }

    render() {
        return (
            <div>
                {map(this.getMatchingRegions(), (region) => (
                    <div key={`${region.name}-${region.type}`}>
                        {this.getRegionItem(region)}
                    </div>
                ))}
            </div>
        );
    }

}
