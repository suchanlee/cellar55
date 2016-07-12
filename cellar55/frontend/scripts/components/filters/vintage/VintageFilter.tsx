import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';
import { map } from "lodash";

import { IFilter, IFilterDelta } from '../../../types/filter';

import BaseFilter from '../BaseFilter';

enum Mode {
    SINGLE, RANGE
}

interface Props {
    vintages: string[];
    filter: IFilter;
    onFilterUpdate: (filtersDelta: IFilterDelta) => void;
}

interface State {
    mode: Mode
}

@PureRender
export default class Filters extends React.Component<Props, State> {

    state: State ={
        mode: Mode.SINGLE
    };

    private handleModeClick = (mode: Mode) => {
        this.setState({ mode });
    }

    private handleSingleVintageChange = (evt: React.SyntheticEvent) => {
        this.props.onFilterUpdate({
            vintage: evt.target["value"],
            vintage_from: "",
            vintage_to: ""
        });
    }

    private handleVintageFromChange = (evt: React.SyntheticEvent) => {
        this.props.onFilterUpdate({
            vintage_from: evt.target["value"],
            vintage: ""
        });
    }

    private handleVintageToChange = (evt: React.SyntheticEvent) => {
        this.props.onFilterUpdate({
            vintage_to: evt.target["value"],
            vintage: ""
        });
    }

    render() {
        return (
            <BaseFilter filterKey="Vintage">
                <div className="vintage-filter-type-container">
                    <span
                        className={classNames("vintage-filter-type", {
                            "selected": this.state.mode === Mode.SINGLE
                        })}
                        onClick={() => this.handleModeClick(Mode.SINGLE)}
                    >
                        Single
                    </span>
                    <span
                        className={classNames("vintage-filter-type", {
                            "selected": this.state.mode === Mode.RANGE
                        })}
                        onClick={() => this.handleModeClick(Mode.RANGE)}
                    >
                        Range
                    </span>
                </div>
                <div className="vintage-filter-container">
                    {this.state.mode === Mode.SINGLE ?
                        <select
                            className="select"
                            value={this.props.filter.vintage}
                            onChange={this.handleSingleVintageChange}
                        >
                            <option key="" value="">Select vintage...</option>
                            {map(this.props.vintages, (v) => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select> :
                        <div>
                            <select
                                className="select"
                                value={this.props.filter.vintage_from}
                                onChange={this.handleVintageFromChange}
                            >
                                <option key="" value="">Vintage from...</option>
                                {map(this.props.vintages, (v) => (
                                    <option key={v} value={v}>{v}</option>
                                ))}
                            </select>
                            <span className="vintage-range-filter-dash" />
                            <select
                                className="select"
                                value={this.props.filter.vintage_to}
                                onChange={this.handleVintageToChange}
                            >
                                <option key="" value="">Vintage to...</option>
                                {map(this.props.vintages, (v) => (
                                    <option key={v} value={v}>{v}</option>
                                ))}
                            </select>
                        </div>
                    }

                </div>
            </BaseFilter>
        )
    }

}
