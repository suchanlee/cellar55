import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

@PureRender
export default class SearchFilter extends React.Component<Props, void> {

    render() {
        return (
            <input
                value={this.props.value}
                onChange={(evt) => this.props.onChange(evt.target['value'])}
                type="text"
            />
        );

    }

}