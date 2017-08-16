import { filter } from "lodash";
import * as objectAssign from "object-assign";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { clearFilter, setFilter, toggleFilter } from "../actions/filterActions";
import { fetchWines, fetchWinesWithNewFilter } from "../actions/wineActions";
import { HOME_TITLE } from "../constants/Constants";
import { IFilter, IFilterDelta, IFilterState } from "../types/filter";
import { IApp } from "../types/main";
import { IWine } from "../types/wine";
import { emptyFilter } from "../initialState";
import { ClosedFilterPanel } from "./ClosedFilterPanel";
import { FilterPanel } from "./FilterPanel";
import { WinePanel } from "./WinePanel";

interface StateProps {
  filterState: IFilterState;
  isQueryingWines: boolean;
  wines: IWine[];
  allWines: IWine[];
}

interface DispatchProps {
  clearFilter(): void;
  fetchWines(filter: IFilter): void;
  fetchWinesWithNewFilter(filter: IFilter): void;
  setFilter(filter: IFilter): void;
  toggleFilter(): void;
}

type Props = StateProps & DispatchProps;

interface State {
  searchQuery: string;
}

class HomePage extends React.PureComponent<Props, State> {
  public state: State = {
    searchQuery: ""
  };

  public componentWillMount() {
    document.title = HOME_TITLE;
  }

  public componentDidMount() {
    if (this.props.wines.length === 0) {
      const { filterState } = this.props;
      this.props.fetchWines(filterState.current);
    }
  }

  public render() {
    const filteredWines = this.getFilteredWines();
    return (
      <div className="panel-container">
        {this.props.filterState.isOpen
          ? <FilterPanel
              wines={this.props.allWines}
              filterState={this.props.filterState}
              onFilterUpdate={this.handleFilterUpdate}
              onFilterApply={this.handleFilterApply}
              onFilterClear={this.handleFilterClear}
              onFilterToggle={this.handleFilterToggle}
            />
          : <ClosedFilterPanel
              currentFilter={this.props.filterState.current}
              onFilterToggle={this.handleFilterToggle}
              isFilterOpen={this.props.filterState.isOpen}
            />}
        <WinePanel
          filteredWines={filteredWines}
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={this.handleSearchQueryChange}
          isFilterOpen={this.props.filterState.isOpen}
          isQueryingWines={this.props.isQueryingWines}
        />
      </div>
    );
  }

  private getFilteredWines(): IWine[] {
    const searchQuery = this.state.searchQuery.trim().toLowerCase();
    if (searchQuery.length === 0) {
      return this.props.wines;
    }
    const wines = filter(this.props.wines, wine => {
      const content = `${wine.name} ${wine.country} ${wine.region} ${wine.subregion}${wine.varietal}
      ${wine.wine_type} ${wine.vintage}`.toLowerCase();
      return content.indexOf(searchQuery) > -1;
    });
    return wines;
  }

  private handleFilterUpdate = (delta: IFilterDelta) => {
    this.props.setFilter(
      objectAssign({}, this.props.filterState.current, delta)
    );
  };

  private handleFilterClear = () => {
    this.props.clearFilter();
    this.props.fetchWinesWithNewFilter(emptyFilter);
  };

  private handleFilterApply = () => {
    const { fetchWinesWithNewFilter, filterState } = this.props;
    fetchWinesWithNewFilter(filterState.current);
  };

  private handleFilterToggle = () => {
    this.props.toggleFilter();
  };

  private handleSearchQueryChange = (value: string) => {
    this.setState({ searchQuery: value });
  };
}

function mapStateToProps(state: IApp) {
  const { isQueryingWines, wines, allWines } = state.wine;
  return {
    allWines,
    filterState: state.filterState,
    isQueryingWines,
    wines
  };
}

function mapDispatchToProps(dispatch: Dispatch<IApp>) {
  return {
    clearFilter: () => dispatch(clearFilter()),
    fetchWines: (filter: IFilter) => dispatch(fetchWines(filter)),
    fetchWinesWithNewFilter: (filter: IFilter) =>
      dispatch(fetchWinesWithNewFilter(filter)),
    setFilter: (filter: IFilter) => dispatch(setFilter(filter)),
    toggleFilter: () => dispatch(toggleFilter())
  };
}

export const ConnectedHomePage = connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(HomePage) as React.ComponentClass<any>;
