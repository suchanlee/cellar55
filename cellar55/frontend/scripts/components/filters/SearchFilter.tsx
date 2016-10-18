import * as React from "react";
import * as PureRender from "pure-render-decorator";

import { SearchInput } from "../base/SearchInput";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

@PureRender
export default class SearchFilter extends React.Component<Props, void> {

    render() {
        return (
            <div className="search-filter-container">
                <SearchInput
                    className="search-filter-input"
                    value={this.props.value}
                    onChange={(evt) => this.props.onChange(evt.target["value"])}
                    type="text"
                    placeholder="Search within results..."
                />
            </div>
        );
    }
}
