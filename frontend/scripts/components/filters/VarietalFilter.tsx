import * as React from 'react';
import * as _ from 'lodash';

import * as Constants from '../../constants/Constants';

import BaseFilter from './BaseFilter';

const removalReg: RegExp = /\d+\%|n\/a|\-/g;
const splitReg: RegExp = /,|with|aka|and|\/|\&/g;

interface VarietalEntry {
    name: string;
    count: number;
}

interface VarietalMap {
    [name: string]: VarietalEntry;
}

interface Props {
    allWines: Types.IWine[];
    filter: Types.IFilter;
    onFilterUpdate: (filtersDelta: Types.IFilterDelta) => void;
}

export default class VarietalFilter extends React.Component<Props, void> {

    private getVarietalMap(): VarietalMap {
        const varietals: string[] = _.map(this.props.allWines, (wine) => wine.varietal);
        let allVarietals: string = varietals.join(',');
        allVarietals = allVarietals.replace(removalReg, ',');
        const filteredVarietals = _.chain(allVarietals.split(splitReg))
                .map((varietal) => varietal.trim().toLowerCase())
                .filter((varietal) => varietal.length > 0)
                .value();
        let varietalMap: VarietalMap = {};
        _.forEach((filteredVarietals), (varietal) => {
            if (!(varietal in varietalMap)) {
                varietalMap[varietal] = {
                    name: varietal,
                    count: 1
                };
            } else {
                varietalMap[varietal].count += 1;
            }
        });
        return varietalMap;
    }

    private handleVarietalClick(varietal: string): void {
        let varietals: string[] = this.props.filter.varietals;
        const idx: number = _.indexOf(varietals, varietal);
        if (idx >= 0) {
            varietals.splice(idx, 1);
        } else {
            varietals.push(varietal);
        }
        console.log(varietal);
        this.props.onFilterUpdate({
            varietals: varietals
        });
    }

    render() {
        const sortedVarietalEntries: VarietalEntry[] = _.reverse(_.sortBy(_.values(this.getVarietalMap()), 'count'));
        return (
            <BaseFilter filterKey='Varietal'>
                {
                    _.map(sortedVarietalEntries, (entry) => (
                        <span className="item" key={entry.name}>
                            <input
                                type="checkbox"
                                checked={_.includes(this.props.filter.varietals, entry.name)}
                                onChange={() => this.handleVarietalClick(entry.name)}
                            />
                            {entry.name}
                        </span>
                    ))
                }
            </BaseFilter>
        );
    }

}