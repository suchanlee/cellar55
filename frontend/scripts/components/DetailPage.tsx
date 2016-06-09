import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { map } from 'lodash';

import { fetchEntry } from '../actions/wineActions';
import { isApplicable, parseVarietal } from '../helpers/helpers';

import { IApp } from '../types/main';
import { IEntry, IWine } from '../types/wine';
import RatingCircles from './ratings/RatingCircles';

interface IRouteParam {
    wineId: string;
}

interface Props {
    dispatch?: any;
    params?: IRouteParam; // automatically injected by react-router
    entry: IEntry;
    wine: IWine;
    isFetching: boolean;
}

@PureRender
class DetailPage extends React.Component<Props, void> {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchEntry(parseInt(this.props.params.wineId)));
    }

    private getWineDetails(): string {
        let details: string = "";
        const wine = this.props.wine;
        const subregion = wine.subregion.trim();
        const region = wine.region.trim();
        const vintage = wine.vintage.trim();
        const varietal = wine.varietal.trim();
        details = isApplicable(subregion) ? `${subregion}, ` : details;
        details = isApplicable(region) ? details + `${region} ` : details;
        details = isApplicable(vintage) ? details + `${vintage} ` : details;
        details = isApplicable(varietal) ? details + parseVarietal(varietal) : details;
        return details;
    }

    private renderText(text: string, className: string): React.ReactElement<any> {
        return (
            <div className={className}>
                {map(text.split('\n'), (blob: string) => <p>{blob}</p>)}
            </div>
        );
    }

    render() {
        if (this.props.isFetching) {
            return <div>Fetching entry...</div>
        }
        const { entry, wine } = this.props;
        return (
            <div className="entry-container">
                <h1 className="entry-wine-name">{wine.name}</h1>
                <p className="entry-wine-details">{this.getWineDetails()}</p>
                <img src={`https://${wine.main_image_url}`} alt={wine.name} className="entry-wine-main-image" />
                <div className="">
                    Fruit
                    <RatingCircles rating={wine.fruit_rating} />
                    Earth
                    <RatingCircles rating={wine.earth_rating} />
                    Body
                    <RatingCircles rating={wine.body_rating} />
                    Tannin
                    <RatingCircles rating={wine.tannin_rating} />
                    Acidity
                    <RatingCircles rating={wine.acid_rating} />
                    Alcohol
                    <RatingCircles rating={wine.alcohol_rating} />
                </div>
                {this.renderText(entry.lead, '')}
                {this.renderText(entry.description, '')}
                {entry.quote}
            </div>
        );
    }
}

function mapStateToProps(state: IApp): Props {
    const { wine } = state;
    return {
        entry: wine.entry,
        wine: wine.selectedWine,
        isFetching: wine.isFetchingEntry
    };
}

export default connect(mapStateToProps)(DetailPage);