import * as React from "react";
import * as PureRender from "pure-render-decorator";
import { map, filter } from "lodash";

import { selectWine, fetchEntry } from "../../actions/wineActions";
import { IWine } from "../../types/wine";

import AdminWineSearch from "./AdminWineSearch";
import AdminWineList from "./AdminWineList";

interface Props {
    dispatch: any;
    wines: IWine[];
    selectedWineId: number;
}

interface State {
    query: string;
}

@PureRender
export default class AdminWinePanel extends React.Component<Props, State> {

    state: State = {
        query: ""
    };

    private handleQueryChange = (query: string) => {
        this.setState({ query });
    }

    private selectWine = (wine: IWine) => {
        this.props.dispatch(selectWine(wine));
        this.props.dispatch(fetchEntry(wine.id));
    }

    private getFilteredWines(): IWine[] {
        const searchQuery = this.state.query.trim().toLowerCase();
        if (searchQuery.length === 0) {
            return this.props.wines;
        }
        const wines = filter(this.props.wines, (wine) => {
            const content = `${wine.name} ${wine.country} ${wine.region} ${wine.subregion}
             ${wine.varietal} ${wine.wine_type} ${wine.vintage}`.toLowerCase();
             return content.indexOf(searchQuery) > - 1;
        });
        return wines;
    }

    render() {
        return (
            <div className="admin-wine-panel panel">
                <AdminWineSearch
                    query={this.state.query}
                    onQueryChange={this.handleQueryChange}
                />
                <AdminWineList
                    filteredWines={this.getFilteredWines()}
                    selectWine={this.selectWine}
                    selectedWineId={this.props.selectedWineId}
                />
            </div>
        );
    }
}
