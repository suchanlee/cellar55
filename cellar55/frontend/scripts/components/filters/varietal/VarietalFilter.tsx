import * as React from "react";

import * as classNames from "classnames";
import { forEach, map, chain, indexOf, reverse, sortBy, values, includes } from "lodash";

import { GrapeVarietals } from "../../../constants/Constants";
import { IFilter, IFilterDelta } from "../../../types/filter";
import { IWine } from "../../../types/wine";
import { toTitleCase } from "../../../helpers/helpers";

import { BaseFilter } from "../BaseFilter";
import { CheckboxInput } from "../../base/CheckboxInput";

const removalReg: RegExp = /\d+\%|n\/a|\-/g;
const splitReg: RegExp = /,|with|aka|and|balance|is|\/|\&/ig;

const CLOSED_VARIETAL_COUNT = 6;

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
  wines: IWine[];
  filter: IFilter;
  onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

interface State {
  isShowAll: boolean;
}

export class VarietalFilter extends React.PureComponent<Props, State> {

  public state: State = {
    isShowAll: false
  };

  public render() {
    let sortedVarietalEntries: VarietalEntry[] = reverse(sortBy(values(this.getVarietalMap()), "count"));
    if (!this.state.isShowAll) {
      sortedVarietalEntries = sortedVarietalEntries.slice(0, CLOSED_VARIETAL_COUNT);
    }
    return (
      <BaseFilter filterKey="Varietal">
        <div className="varietal-filter-values-container">
          {map(sortedVarietalEntries, (entry) => {
            const checked = includes(this.props.filter.varietals, entry.name);
            return <span className="item varietal-filter-item" key={entry.name}>
              <CheckboxInput
                checked={checked}
                onChange={() => this.handleVarietalClick(entry.name)}
              >
                {toTitleCase(entry.name)}
              </CheckboxInput>
            </span>;
          })}
          <img
            src="/static/images/caret.png"
            alt="caret"
            onClick={this.handleCaretClick}
            className={classNames("caret-icon", {
              closed: !this.state.isShowAll
            })}
          />
        </div>
      </BaseFilter>
    );
  }

  private getAllVarietalSet(): VarietalSet {
    const allVarietalSet: VarietalSet = {};
    forEach(GrapeVarietals, (v) => allVarietalSet[v] = true);
    return allVarietalSet;
  }

  private getVarietalMap(): VarietalMap {
    const allVarietalSet = this.getAllVarietalSet();
    const varietals: string[] = map(this.props.wines, (wine) => wine.varietal);
    let allVarietals: string = varietals.join(",");
    allVarietals = allVarietals.replace(removalReg, ",");
    const filteredVarietals = chain(allVarietals.split(splitReg))
        .map((varietal) => varietal.trim().toLowerCase())
        .filter((varietal) => varietal.length > 0 && varietal in allVarietalSet)
        .value();
    const varietalMap: VarietalMap = {};
    forEach((filteredVarietals), (varietal) => {
      if (!(varietal in varietalMap)) {
        varietalMap[varietal] = {
          count: 1,
          name: varietal,
        };
      } else {
        varietalMap[varietal].count += 1;
      }
    });
    return varietalMap;
  }

  private handleVarietalClick = (varietal: string) => {
    const varietals: string[] = this.props.filter.varietals.slice();
    const idx: number = indexOf(varietals, varietal);
    if (idx >= 0) {
      varietals.splice(idx, 1);
    } else {
      varietals.push(varietal);
    }
    this.props.onFilterUpdate({ varietals });
  }

  private handleCaretClick = () => {
    this.setState({ isShowAll: !this.state.isShowAll });
  }
}
