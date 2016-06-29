import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';

import { WineType } from '../constants/Constants';

interface Props {
    wineType: string;
    className?: string;
}

//DELETE
@PureRender
export default class WineTypeBox extends React.Component<Props, void> {

    render() {
        const { wineType, className } = this.props;
        return (
            <div className={classNames('wine-type-box', className, {
                'red': wineType.toUpperCase() === WineType.RED,
                'white': wineType.toUpperCase() === WineType.WHITE,
                'rose': wineType.toUpperCase() === WineType.ROSE,
                'sparkling': wineType.toUpperCase() === WineType.SPARKLING
            })} />
        );
    }
}