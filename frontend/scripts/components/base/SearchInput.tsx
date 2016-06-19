import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

@PureRender
export class SearchInput extends React.Component<React.HTMLProps<HTMLInputElement>, void> {

    render() {
        return (
            <div className="search-input-container">
                <MagnifyingGlassIcon />
                <input
                    {...this.props}
                    className={`search-input ${this.props.className}`}
                />
            </div>
        )
    }

}
