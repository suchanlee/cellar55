import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

import { IRegion } from '../../../types/region';
import { getRegionType } from "../../../helpers/helpers";

import CrossIcon from '../../icons/CrossIcon';

interface Props {
    region: IRegion
    removeRegionFilter: (region: IRegion) => void;
}

@PureRender
export default class RegionFilterItem extends React.Component<Props, void> {

    private handleCrossClick = () => {
        this.props.removeRegionFilter(this.props.region);
    }

    render() {
        const { region } = this.props;
        return (
            <li className="region-filter-item">
                <div className="region-filter-item-data">
                    <div className="region-filter-item-name">{region.name}</div>
                </div>
                <div
                    className="region-filter-item-remove"
                    onClick={this.handleCrossClick}
                >
                    <CrossIcon />
                </div>
            </li>
        );
    }

}
