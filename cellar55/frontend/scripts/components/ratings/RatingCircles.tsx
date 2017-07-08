import * as React from "react";

interface Props {
  rating: number;
}

export class RatingCircles extends React.PureComponent<Props, {}> {
  public render() {
    const numFullCircles: number = Math.floor(this.props.rating);
    const numHalfCircles: number = 2 * (this.props.rating - numFullCircles);
    const numEmptyCircles: number = 5 - numFullCircles - numHalfCircles;
    return (
      <span className="rating">
        {this.renderFullCircles(numFullCircles)}
        {this.renderHalfCircles(numHalfCircles)}
        {this.renderEmptyCircles(numEmptyCircles)}
      </span>
    );
  }

  private renderFullCircles(count: number): JSX.Element[] {
    return this.renderCircles("circle full-circle", count);
  }

  private renderHalfCircles(count: number): JSX.Element[] {
    return this.renderCircles("circle half-circle", count);
  }

  private renderEmptyCircles(count: number): JSX.Element[] {
    return this.renderCircles("circle empty-circle", count);
  }

  private renderCircles(circleClass: string, count: number): JSX.Element[] {
    const circles: JSX.Element[] = [];
    for (let i = 0; i < count; i++) {
      if (circleClass.indexOf("half-circle")) {
        circles.push(
          <span key={`${circleClass}-${i}`} className={circleClass}>
            <span />
          </span>
        );
      } else {
        circles.push(
          <span key={`${circleClass}-${i}`} className={circleClass} />
        );
      }
    }
    return circles;
  }
}
