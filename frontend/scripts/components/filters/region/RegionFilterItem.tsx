import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

import { IRegion } from '../../../types/region';

interface Props {
    region: IRegion
}

@PureRender
export default class RegionFilterItem extends React.Component<Props, void> {

    render() {
        const { region } = this.props;
        return (
            <li className="region-filter-item">
                <span>{region.name}</span>
            </li>
        );
    }

}