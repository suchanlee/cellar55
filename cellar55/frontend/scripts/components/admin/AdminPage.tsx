import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchEntry, fetchWines, selectWine } from "../../actions/wineActions";
import { IFilter } from "../../types/filter";
import { IApp } from "../../types/main";
import { IWine } from "../../types/wine";
import { emptyFilter } from "../../initialState";
import { AdminEntryPanel } from "./AdminEntryPanel";
import { AdminWinePanel } from "./AdminWinePanel";

interface StateProps {
  wines: IWine[];
  selectedWine: IWine | undefined;
  isFetchingEntry: boolean;
}

interface DispatchProps {
  fetchEntry(entryId: number): void;
  fetchWines(filter: IFilter): void;
  selectWine(wine: IWine): void;
}

type Props = StateProps & DispatchProps;

class AdminPage extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    this.props.fetchWines(emptyFilter);
  }

  public render() {
    const selectedWine = this.props.selectedWine;
    return (
      <div className="admin-page">
        <AdminWinePanel
          wines={this.props.wines}
          selectedWineId={selectedWine == null ? undefined : selectedWine.id}
          fetchEntry={this.props.fetchEntry}
          selectWine={this.props.selectWine}
        />
        <AdminEntryPanel isFetchingEntry={this.props.isFetchingEntry} />
      </div>
    );
  }
}

function mapStateToProps(state: IApp) {
  const { wine } = state;
  return {
    isFetchingEntry: wine.isFetchingEntry,
    selectedWine: wine.selectedWine,
    wines: state.wine.allWines
  };
}

function mapDispatchToProps(dispatch: Dispatch<IApp>) {
  return {
    fetchEntry: (entryId: number) => dispatch(fetchEntry(entryId)),
    fetchWines: (filter: IFilter) => dispatch(fetchWines(filter)),
    selectWine: (wine: IWine) => dispatch(selectWine(wine))
  };
}

export const ConnectedAdminPage = connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage) as React.ComponentClass<any>;
