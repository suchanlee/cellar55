import * as React from 'react';
import * as _ from 'lodash';

import * as Constants from '../../constants/Constants';
import { IFilter, IFilterDelta } from '../../types/filter';
import { IWine } from '../../types/wine';
import { IRegion, RegionType } from '../../types/region';

import BaseFilter from './BaseFilter';
import RegionSearchList from './RegionSearchList';

const removalReg: RegExp = /\(.+\)|n\/a/g;
const splitReg: RegExp = /\,|\s+\-\s+/g;

interface Props {
    allWines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

interface State {
    query: string;
}

export default class RegionFilter extends React.Component<Props, State> {

    state: State = {
        query: ''
    };

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
        const regions: string[] = _.map(this.props.allWines, (wine) => {
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
        return _.chain(regions)
                .filter((region) => region.length > 0)
                .uniq()
                .join(',')
                .split(splitReg)
                .filter((region) => region.length > 0)
                .map<IRegion>((region) => {
                    return {
                        name: region.trim(),
                        type: type
                    }
                })
                .value();
    }

    private handleChange = (evt) => {
        this.setState({query: evt.target.value});
    }

    render() {
        return (
            <BaseFilter filterKey='Region'>
                <input
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange}
                />
                <RegionSearchList
                    query={this.state.query}
                    onFilterUpdate={this.props.onFilterUpdate}
                    regions={this.getAllRegions()}
                />
            </BaseFilter>
        );
    }
}