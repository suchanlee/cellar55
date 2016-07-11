import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import * as classNames from 'classnames';
import { WineType } from '../constants/Constants';
import { Link } from 'react-router';

import { IWine } from '../types/wine';
import WineTypeBox from './WineTypeBox';

interface WineName {
    winery: string;
    rest: string;
}

interface Props {
    wine: IWine;
}

@PureRender
export default class WineItem extends React.Component<Props, void> {

    private getWineName(): WineName {
        const nameSplit = this.props.wine.name.split(',');
        return {
            winery: nameSplit[0],
            rest: nameSplit.slice(1).join(', ')
        };
    }

    private getRegion(): string {
        const { wine } = this.props;
        if (wine.subregion.trim().length === 0 || wine.subregion.toLowerCase() === "n/a") {
            return wine.region;
        }
        return `${wine.subregion}, ${wine.region}`;
    }

    render() {
        const wine: IWine = this.props.wine;
        const wineType = wine.wine_type;
        const wineName: WineName = this.getWineName();
        return (
            <li className="wine-item">
                <div className="wine-item-container">
                    <div
                        className="wine-item-image-container"
                        style={{
                            backgroundImage: `url(https://${wine.alt_image_url})`
                        }}
                    />
                    <div className='wine-item-info'>
                        <WineTypeBox wineType={wine.wine_type} />
                        <Link to={`/wine/${wine.id}`} className="wine-name-container">
                            <div className='wine-name'>{wineName.winery}</div>
                            <div className='wine-name'>{wineName.rest}</div>
                        </Link>
                        <div className="wine-item-metadata">
                            <span>{this.getRegion()}</span>
                            <span className="wine-item-metadata-divider" />
                            <span>{wine.vintage}</span>
                            <span className="wine-item-metadata-divider" />
                            <span>{wine.varietal}</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}