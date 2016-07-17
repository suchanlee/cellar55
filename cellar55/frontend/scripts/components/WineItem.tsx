import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';
import { WineType } from '../constants/Constants';
import { Link } from 'react-router';

import { IWine } from '../types/wine';
import { BaseWineItem, IWineItemProps, IWineName } from "./base/BaseWineComponents";
import WineTypeBox from "./WineTypeBox";

@PureRender
export default class WineItem extends BaseWineItem<IWineItemProps> {

    render() {
        const wine: IWine = this.props.wine;
        const wineType = wine.wine_type;
        const wineName: IWineName = this.getWineName();
         return (
            <li className="wine-item">
                <div className="wine-item-container">
                    <div
                        className="wine-item-image-container"
                        style={{
                            backgroundImage: `url(https://${wine.alt_image_url})`
                        }}
                    >
                        <Link to={`/wine/${wine.id}`} className="wine-item-image-link" />
                    </div>
                    <div className='wine-item-info'>
                        <WineTypeBox wineType={wine.wine_type} />
                        <Link to={`/wine/${wine.id}`} className="wine-name-container">
                            <div className='wine-name'>{wineName.winery}</div>
                            <div className='wine-name'>{wineName.rest}</div>
                        </Link>
                        {this.renderWineMetadata()}
                        <div className="wine-item-filler">css :(</div>
                    </div>
                </div>
            </li>
        );
    }
}