import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';

import { IRegion, RegionType } from '../../../types/region';

interface Props {
    idx: number;
    region: IRegion
    selected: boolean;
    onClick: (region: IRegion) => void;
    onMouseOver: (idx: number) => void;
}

@PureRender
export default class RegionSearchItem extends React.Component<Props, void> {

    private getRegionType(region: IRegion): string{
        let regionType: string = '';
        switch (region.type) {
            case RegionType.COUNTRY:
                regionType = 'country';
                break;
            case RegionType.REGION:
                regionType = 'region';
                break;
            case RegionType.SUBREGION:
                regionType = 'subregion';
                break;
            default:
        }
        return regionType;
    }

    render() {
        return (
            <div
                onClick={() => this.props.onClick(this.props.region)}
                onMouseOver={() => this.props.onMouseOver(this.props.idx)}
                className={classNames('region-search-item', {
                    'selected': this.props.selected
                })}
            >
                <div className="region-search-item-name">{this.props.region.name}</div>
                <div className="region-search-item-type">{this.getRegionType(this.props.region)}</div>
            </div>
        );
    }

}