import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { connect } from 'react-redux';

import { fetchEntry } from '../actions/wineActions';

import { IApp } from '../types/main';
import { IEntry } from '../types/wine';

interface IRouteParam {
    wineId: string;
}

interface Props {
    dispatch?: any;
    params?: IRouteParam; // automatically injected by react-router
    entry: IEntry;
    isFetching: boolean;
}

@PureRender
class DetailPage extends React.Component<Props, void> {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchEntry(parseInt(this.props.params.wineId)));
    }

    render() {
        if (this.props.isFetching) {
            return <div>Fetching entry...</div>
        }
        const { entry } = this.props;
        return (
            <div>{entry.wine.name}</div>
        );
    }
}

function mapStateToProps(state: IApp): Props {
    const { wine } = state;
    return {
        entry: wine.entry,
        isFetching: wine.isFetchingEntry
    };
}

export default connect(mapStateToProps)(DetailPage);