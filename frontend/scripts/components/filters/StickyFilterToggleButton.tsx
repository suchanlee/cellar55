import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

interface Props {
    onToggle: () => void;
    isShown: boolean;
}

@PureRender
export default class StickyFilterToggleButton extends React.Component<Props, void> {

    render() {
        return (
            <span
                onClick={this.props.onToggle}
                className="sticky-filter-header-toggle-button"
            >
                {this.props.isShown ? "hide filter -" : "show filter +"}
            </span>
        )
    }

}