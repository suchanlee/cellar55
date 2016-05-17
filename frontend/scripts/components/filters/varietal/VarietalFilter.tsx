import * as React from 'react';
import { forEach, map, chain, indexOf, reverse, sortBy, values, includes } from 'lodash';

import * as Constants from '../../../constants/Constants';
import { IFilter, IFilterDelta } from '../../../types/filter';
import { IWine } from '../../../types/wine';

import BaseFilter from '../BaseFilter';

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
    allWines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

export default class VarietalFilter extends React.Component<Props, void> {

    private getVarietalMap(): VarietalMap {
        const varietals: string[] = map(this.props.allWines, (wine) => wine.varietal);
        let allVarietals: string = varietals.join(',');
        allVarietals = allVarietals.replace(removalReg, ',');
        const filteredVarietals = chain(allVarietals.split(splitReg))
                .map((varietal) => varietal.trim().toLowerCase())
                .filter((varietal) => varietal.length > 0)
                .value();
        let varietalMap: VarietalMap = {};
        forEach((filteredVarietals), (varietal) => {
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

    private handleVarietalClick = (varietal: string) => {
        let varietals: string[] = this.props.filter.varietals;
        const idx: number = indexOf(varietals, varietal);
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
        const sortedVarietalEntries: VarietalEntry[] = reverse(sortBy(values(this.getVarietalMap()), 'count'));
        return (
            <BaseFilter filterKey='Varietal'>
                {
                    map(sortedVarietalEntries, (entry) => (
                        <span className="item" key={entry.name}>
                            <input
                                type="checkbox"
                                checked={includes(this.props.filter.varietals, entry.name)}
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
