import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

import { IWine } from '../../types/wine';

interface Props {
    rating: number;
}

@PureRender
export default class RatingCircles extends React.Component<Props, void> {

    private renderFullCircles(count: number): React.ReactElement<any>[] {
        return this.renderCircles('circle full-circle', count);
    }

    private renderHalfCircles(count: number): React.ReactElement<any>[] {
        return this.renderCircles('circle half-circle', count);
    }

    private renderEmptyCircles(count: number): React.ReactElement<any>[] {
        return this.renderCircles('circle empty-circle', count);
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

    render() {
        const numFullCircles: number = Math.floor(this.props.rating);
        const numHalfCircles: number = 2 * (this.props.rating - numFullCircles);
        const numEmptyCircles: number = 5 - numFullCircles - numHalfCircles;
        return (
            <span className="rating">
                {this.renderFullCircles(numFullCircles)}
                {this.renderHalfCircles(numHalfCircles)}
                {this.renderEmptyCircles(numEmptyCircles)}
            </span>
        )
    }

}