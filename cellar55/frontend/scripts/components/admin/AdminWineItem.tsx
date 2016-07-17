import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';

import { IWine } from '../../types/wine';
import { BaseWineItem, IWineItemProps, IWineName } from "../base/BaseWineComponents";
import WineTypeBox from "../WineTypeBox";

interface Props {
    wine: IWine;
}

@PureRender
export default class AdminWineItem extends BaseWineItem {

    render() {
        const wine: IWine = this.props.wine;
        const wineType = wine.wine_type;
        const wineName: IWineName = this.getWineName();
        return (
            <li className="wine-item">
                <div className="wine-item-container">
                    <div className='wine-item-info'>
                        <WineTypeBox wineType={wine.wine_type} />
                        <div className="wine-name-container">
                            <div className='wine-name'>{wineName.winery}</div>
                            <div className='wine-name'>{wineName.rest}</div>
                        </div>
                        {this.renderWineMetadata()}
                    </div>
                </div>
            </li>
        );
    }
}
