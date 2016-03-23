import * as React from 'react';

const QUOTE_WORD_LIMIT: number = 15;

interface Props {
    wine: Types.Wine;
}

interface State {
    showFullQuote: boolean;
}

export default class WineItem extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {showFullQuote: false};
    }

    private getQuote(): string {
        if (this.state.showFullQuote) {
            return this.props.wine.quote;
        } else {
            const quoteWords: string[] = this.props.wine.quote.split(' ');
            if (quoteWords.length > QUOTE_WORD_LIMIT) {
                return `${quoteWords.slice(0, QUOTE_WORD_LIMIT).join(' ')}...`;
            }
            return this.props.wine.quote;
        }
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
        const wine: Types.Wine = this.props.wine;
        const backgroundStyle = {
            'backgroundImage': `url('https://${wine.alt_image_url}')`
        };
        return (
            <li className='wine-item'>
                <div className='wine-item-image' style={backgroundStyle} alt={wine.name} />
                <div className='wine-item-info-container'>
                    <div className='wine-item-info-wrapper'>
                        <div className='wine-item-info'>
                            <h2>{wine.name}</h2>
                            <div>{`${wine.subregion}, ${wine.region} ${wine.vintage}`}</div>
                            <div>{wine.varietal}</div>
                            <table className="ratings">
                                <tbody>
                                    {this.renderRating('fruit', wine.fruit_rating)}
                                    {this.renderRating('tannin', wine.tannin_rating)}
                                    {this.renderRating('earth', wine.earth_rating)}
                                    {this.renderRating('acid', wine.acid_rating)}
                                    {this.renderRating('body', wine.body_rating)}
                                    {this.renderRating('alcohol', wine.alcohol_rating)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}