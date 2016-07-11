import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { IWine } from '../types/wine';
import SearchFilter from "./filters/SearchFilter";
import WineList from "./WineList";

interface Props {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    filteredWines: IWine[];
}

const pluralize = function(word, count, postfix="s") {
    if (count > 1) {
        return word + postfix;
    }
    return word;
}

@PureRender
export default class WinePanel extends React.Component<Props, void> {

    render() {
        return (
            <div className="panel wine-panel">
                <div className="wine-panel-header">
                    <SearchFilter
                        value={this.props.searchQuery}
                        onChange={this.props.onSearchQueryChange}
                    />
                    <span className="wine-count">
                        {this.props.filteredWines.length} {pluralize("wine", this.props.filteredWines.length)}
                    </span>
                </div>
                <WineList
                    searchQuery={this.props.searchQuery}
                    filteredWines={this.props.filteredWines}
                />
            </div>
        );
    }
}
