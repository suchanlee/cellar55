import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { isUndefined } from "lodash";
import { Link } from "react-router";
import { connect } from 'react-redux';
import { map } from 'lodash';

import { fetchEntry } from '../actions/wineActions';
import { isApplicable, parseVarietal } from '../helpers/helpers';

import { IApp } from '../types/main';
import { IEntry, IWine } from '../types/wine';
import RatingCircles from './ratings/RatingCircles';
import WineTypeBox from './WineTypeBox';
import Header from "./Header";

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

    componentWillReceiveProps(nextProps: Props) {
        if (!isUndefined(nextProps.wine)) {
            if (isUndefined(this.props.wine) || this.props.wine.id !== nextProps.wine.id) {
                document.title = nextProps.wine.name;
            }
        }
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
        const { entry, wine } = this.props;
        if (this.props.isFetching || isUndefined(wine)) {
            return <div>Fetching entry...</div>
        }
        return (
            <div className="entry-container">
                <Link to="/">
                    <img
                        className="entry-close-button"
                        src="/static/images/close.png"
                        alt="close"
                    />
                </Link>
                <h1 className="entry-wine-name">{wine.name}</h1>
                <WineTypeBox wineType={wine.wine_type} />
                <p className="entry-wine-details">
                    {this.getWineDetails()}
                </p>
                <img src={`https://${wine.alt_image_url}`} alt={wine.name} className="entry-wine-main-image" />
                <div className="entry-wine-ratings">
                    <div className="entry-wine-rating-item">
                        fruit
                        <RatingCircles rating={wine.fruit_rating} />
                    </div>
                    <div className="entry-wine-rating-item">
                        earth
                        <RatingCircles rating={wine.earth_rating} />
                    </div>
                    <div className="entry-wine-rating-item">
                        body
                        <RatingCircles rating={wine.body_rating} />
                    </div>
                    <div className="entry-wine-rating-item">
                        tannin
                        <RatingCircles rating={wine.tannin_rating} />
                    </div>
                    <div className="entry-wine-rating-item">
                        acidity
                        <RatingCircles rating={wine.acid_rating} />
                    </div>
                    <div className="entry-wine-rating-item">
                        alcohol
                        <RatingCircles rating={wine.alcohol_rating} />
                    </div>
                </div>
                <h3 className="entry-subheading">The Wine</h3>
                {this.renderText(entry.lead, 'entry-wine-lead')}
                <div className="entry-wine-quote">"{entry.quote}"</div>
                <h3 className="entry-subheading">Ian's Description</h3>
                <div className="entry-wine-metadata">
                    <dl>
                        <dt>country</dt>
                        <dd>{wine.country}</dd>
                        <dt>region</dt>
                        <dd>{wine.region}</dd>
                        <dt>sub-region</dt>
                        <dd>{wine.subregion}</dd>
                        <dt>varietal</dt>
                        <dd>{wine.varietal}</dd>
                        <dt>production</dt>
                        <dd>{wine.production}</dd>
                        <dt>alcohol</dt>
                        <dd>{wine.alcohol}</dd>
                        <dt>oak</dt>
                        <dd>{wine.oak}</dd>
                        <dt>soil</dt>
                        <dd>{wine.soil}</dd>
                        <dt>farming</dt>
                        <dd>{wine.farming}</dd>
                    </dl>
                </div>
                {this.renderText(entry.description, 'entry-wine-description')}
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