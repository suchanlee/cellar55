import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { Link } from "react-router";
import { connect } from 'react-redux';
import { map } from 'lodash';

import { emptyFilter } from "../../initialState";
import { IApp } from '../../types/main';
import { IWine } from "../../types/wine";
import { fetchWines } from "../../actions/wineActions";

import AdminWinePanel from "./AdminWinePanel";
import AdminEntryPanel from "./AdminEntryPanel";

interface Props {
    dispatch?: any;
    wines: IWine[];
}

@PureRender
class AdminPage extends React.Component<Props, void> {

    componentDidMount() {
        this.props.dispatch(fetchWines(emptyFilter));
    }

    render() {
        return (
            <div className="admin-page">
                <AdminWinePanel wines={this.props.wines} />
                <AdminEntryPanel />
            </div>
        );
    }
}

function mapStateToProps(state: IApp): Props {
    const { wine } = state;
    return {
        wines: state.wine.allWines
    };
}

export default connect(mapStateToProps)(AdminPage);