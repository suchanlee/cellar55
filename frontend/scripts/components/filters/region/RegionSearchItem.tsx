import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

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

    private getRegionLabel(region: IRegion): string{
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
        return `${regionType}: ${region.name}`
    }

    render() {
        return (
            <div
                onClick={() => this.props.onClick(this.props.region)}
                onMouseOver={() => this.props.onMouseOver(this.props.idx)}
            >
                {this.props.selected ? 'selected' : ''}
                {this.getRegionLabel(this.props.region)}
            </div>
        );
    }

}