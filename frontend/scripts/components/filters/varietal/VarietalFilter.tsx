import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from "classnames";
import { forEach, map, chain, indexOf, reverse, sortBy, values, includes } from 'lodash';

import { GrapeVarietals } from '../../../constants/Constants';
import { IFilter, IFilterDelta } from '../../../types/filter';
import { IWine } from '../../../types/wine';

import BaseFilter from '../BaseFilter';
import { CheckboxInput } from "../../base/CheckboxInput";

const removalReg: RegExp = /\d+\%|n\/a|\-/g;
const splitReg: RegExp = /,|with|aka|and|balance|is|\/|\&/ig;

interface VarietalEntry {
    name: string;
    count: number;
}

interface VarietalMap {
    [name: string]: VarietalEntry;
}

interface VarietalSet {
    [name: string]: boolean;
}

interface Props {
    allWines: IWine[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

@PureRender
export default class VarietalFilter extends React.Component<Props, void> {

    private getAllVarietalSet(): VarietalSet {
        let allVarietalSet: VarietalSet = {};
        forEach(GrapeVarietals, (v) => allVarietalSet[v] = true);
        return allVarietalSet;
    }

    private getVarietalMap(): VarietalMap {
        const allVarietalSet = this.getAllVarietalSet();
        const varietals: string[] = map(this.props.allWines, (wine) => wine.varietal);
        let allVarietals: string = varietals.join(',');
        allVarietals = allVarietals.replace(removalReg, ',');
        const filteredVarietals = chain(allVarietals.split(splitReg))
                .map((varietal) => varietal.trim().toLowerCase())
                .filter((varietal) => varietal.length > 0 && varietal in allVarietalSet)
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
        this.props.onFilterUpdate({
            varietals: varietals
        });
    }

    render() {
        const sortedVarietalEntries: VarietalEntry[] = reverse(sortBy(values(this.getVarietalMap()), 'count'));
        return (
            <BaseFilter filterKey='Varietal'>
                {map(sortedVarietalEntries, (entry) => {
                    const checked = includes(this.props.filter.varietals, entry.name);
                    return <span className="item varietal-filter-item" key={entry.name}>
                        <CheckboxInput
                            checked={checked}
                            onChange={() => this.handleVarietalClick(entry.name)}
                        >
                            {entry.name}
                        </CheckboxInput>
                    </span>
                })}
            </BaseFilter>
        );
    }

}
