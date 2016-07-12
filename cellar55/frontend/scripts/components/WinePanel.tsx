import * as React from "react";
import * as PureRender from "pure-render-decorator";
import * as classNames from "classnames";

import { IWine } from '../types/wine';
import SearchFilter from "./filters/SearchFilter";
import WineList from "./WineList";

interface Props {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    filteredWines: IWine[];
    isFilterOpen: boolean;
    isQueryingWines: boolean;
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
        let content;
        if (this.props.isQueryingWines) {
            content = (
                <div className="wine-loading-container">
                    <img src="" alt="Loading wines..." />
                    <div className="wine-loading-text">Fetching wines . . .</div>
                </div>
            );
        } else {
            content = (
                <WineList
                    searchQuery={this.props.searchQuery}
                    filteredWines={this.props.filteredWines}
                />
            );
        }
        return (
            <div className={classNames("panel wine-panel", {
                "open": this.props.isFilterOpen
            })}>
                <div className="wine-panel-header">
                    <SearchFilter
                        value={this.props.searchQuery}
                        onChange={this.props.onSearchQueryChange}
                    />
                    <span className="wine-count">
                        {this.props.filteredWines.length} {pluralize("wine", this.props.filteredWines.length)}
                    </span>
                </div>
                {content}
            </div>
        );
    }
}
