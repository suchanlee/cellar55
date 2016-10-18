import * as React from "react";
import * as PureRender from "pure-render-decorator";
import { connect } from "react-redux";
import { isUndefined } from "lodash";

import { emptyFilter } from "../../initialState";
import { IApp } from "../../types/main";
import { IWine } from "../../types/wine";
import { fetchWines } from "../../actions/wineActions";

import AdminWinePanel from "./AdminWinePanel";
import AdminEntryPanel from "./AdminEntryPanel";

interface Props {
    dispatch?: any;
    wines: IWine[];
    selectedWine: IWine;
    isFetchingEntry: boolean;
}

@PureRender
class AdminPage extends React.Component<Props, void> {

    componentDidMount() {
        this.props.dispatch(fetchWines(emptyFilter));
    }

    render() {
        const selectedWine = this.props.selectedWine;
        return (
            <div className="admin-page">
                <AdminWinePanel
                    wines={this.props.wines}
                    dispatch={this.props.dispatch}
                    selectedWineId={isUndefined(selectedWine) ? undefined : selectedWine.id}
                />
                <AdminEntryPanel
                    isFetchingEntry={this.props.isFetchingEntry}
                />
            </div>
        );
    }
}

function mapStateToProps(state: IApp): Props {
    const { wine } = state;
    return {
        wines: state.wine.allWines,
        selectedWine: wine.selectedWine,
        isFetchingEntry: wine.isFetchingEntry
    };
}

export default connect(mapStateToProps)(AdminPage);
