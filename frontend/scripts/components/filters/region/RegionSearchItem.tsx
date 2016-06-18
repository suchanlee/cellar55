import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';

import { IRegion } from '../../../types/region';
import { getRegionType } from "../../../helpers/helpers";

interface Props {
    idx: number;
    region: IRegion
    selected: boolean;
    onClick: (region: IRegion) => void;
    onMouseOver: (idx: number) => void;
}

@PureRender
export default class RegionSearchItem extends React.Component<Props, void> {

    private handleClick = () => this.props.onClick(this.props.region);
    private handleMouseOver = () => {
        this.props.onMouseOver(this.props.idx);
    }

    render() {
        return (
            <div
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                className={classNames('region-search-item', {
                    'selected': this.props.selected
                })}
            >
                <div className="region-search-item-name">{this.props.region.name}</div>
                <div className="region-search-item-type">{getRegionType(this.props.region.type)}</div>
            </div>
        );
    }

}