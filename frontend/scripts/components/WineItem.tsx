import * as React from 'react';
import * as classNames from 'classnames';
import * as Constants from '../constants/Constants';

import { IWine } from '../types/wine';

const QUOTE_WORD_LIMIT: number = 15;

interface WineName {
    winery: string;
    rest: string;
}

interface Props {
    wine: IWine;
}

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
        const wineName: WineName = this.getWineName();
        return (
            <li className='wine-item'>
                <div className="wine-type-container">
                    <div className={classNames('wine-type-box', {
                        'red': wine.wine_type.toUpperCase() === Constants.WineType.RED,
                        'white': wine.wine_type.toUpperCase() === Constants.WineType.WHITE,
                        'rose': wine.wine_type.toUpperCase() === Constants.WineType.ROSE,
                        'sparkling': wine.wine_type.toUpperCase() === Constants.WineType.SPARKLING
                    })}></div>
                </div>
                <div className="wine-item-container">
                    <div className='wine-item-info-container'>
                        <div className='wine-item-info'>
                            <div className="wine-name-container">
                                <div className='wine-name'>{wineName.winery}</div>
                                <div className='wine-name'>{wineName.rest}</div>
                            </div>
                            <div>{`${wine.subregion}, ${wine.region} ${wine.vintage}`}</div>
                            <div className='varietal'>{wine.varietal}</div>
                        </div>
                    </div>
                    <div className="wine-item-ratings-container">
                        <table className="ratings">
                            <tbody>
                                {this.renderRating('Fruit', wine.fruit_rating)}
                                {this.renderRating('Tannin', wine.tannin_rating)}
                                {this.renderRating('Earth', wine.earth_rating)}
                                {this.renderRating('Acid', wine.acid_rating)}
                                {this.renderRating('Body', wine.body_rating)}
                                {this.renderRating('Alcohol', wine.alcohol_rating)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </li>
        );
    }
}