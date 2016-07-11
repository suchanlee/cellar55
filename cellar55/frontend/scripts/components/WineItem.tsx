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

    private renderCircles(circleClass: string, count: number): React.ReactElement<any>[] {
        let circles: React.ReactElement<any>[] = [];
        for (var i = 0; i < count; i++) {
            if (circleClass.indexOf('half-circle')) {
                circles.push(<span key={`${circleClass}-${i}`} className={circleClass}><span /></span>);
            } else {
                circles.push(<span key={`${circleClass}-${i}`} className={circleClass} />);
            }

        }
        return circles;
    }

    private renderRating(ratingType: string, rating: number): React.ReactElement<any> {
        const numFullCircles: number = Math.floor(rating);
        const numHalfCircles: number = 2 * (rating - numFullCircles);
        const numEmptyCircles: number = 5 - numFullCircles - numHalfCircles;
        return (
            <tr className="rating">
                <td className="rating-type">{ratingType}</td>
                <td>
                    {this.renderCircles('circle full-circle', numFullCircles)}
                    {this.renderCircles('circle half-circle', numHalfCircles)}
                    {this.renderCircles('circle empty-circle', numEmptyCircles)}
                </td>
            </tr>
        );
    }

    render() {
        const wine: IWine = this.props.wine;
        const wineType = wine.wine_type;
        const wineName: WineName = this.getWineName();
        return (
            <li className={classNames('wine-item', {
                'red': wineType.toUpperCase() === WineType.RED,
                'white': wineType.toUpperCase() === WineType.WHITE,
                'rose': wineType.toUpperCase() === WineType.ROSE,
                'sparkling': wineType.toUpperCase() === WineType.SPARKLING
            })}>
                <div className="wine-item-container">
                    <div className="wine-item-image-container">
                        <img src={`https://${wine.alt_image_url}`} alt={wine.name} />
                    </div>
                    <div className='wine-item-info'>
                         <div className={classNames('wine-type-column', {
                            'red': wineType.toUpperCase() === WineType.RED,
                            'white': wineType.toUpperCase() === WineType.WHITE,
                            'rose': wineType.toUpperCase() === WineType.ROSE,
                            'sparkling': wineType.toUpperCase() === WineType.SPARKLING
                            })} />
                        <Link to={`/wine/${wine.id}`} className="wine-name-container">
                            <div className='wine-name'>{wineName.winery}</div>
                            <div className='wine-name'>{wineName.rest}</div>
                        </Link>
                        <div className="region">{`${wine.subregion}, ${wine.region}`}</div>
                        <div className="vintage">{wine.vintage}</div>
                        <div className="varietal">{wine.varietal}</div>
                    </div>
                </div>
            </li>
        );
    }
}