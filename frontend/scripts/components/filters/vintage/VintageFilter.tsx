import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';

import { IFilter, IFilterDelta } from '../../../types/filter';

import BaseFilter from '../BaseFilter';

enum Mode {
    SINGLE, RANGE
}

interface Props {
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

                </div>
            </BaseFilter>
        )
    }

}
