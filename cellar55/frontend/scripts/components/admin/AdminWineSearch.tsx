import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { SearchInput } from "../base/SearchInput";

interface Props {
    query: string;
    onQueryChange: (query: string) => void;
}

@PureRender
export default class AdminWineSearch extends React.Component<Props, void> {

    private handleChange = (evt: React.SyntheticEvent) => {
        this.props.onQueryChange(evt.target["value"]);
    }

    render() {
        return (
            <div className="admin-wine-search">
                <SearchInput
                    className="admin-wine-search-input"
                    value={this.props.query}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
