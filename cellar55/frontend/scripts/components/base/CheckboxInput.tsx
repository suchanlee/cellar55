import * as React from 'react';
import * as classNames from "classnames";
import * as PureRender from 'pure-render-decorator';

export interface ICheckboxInputProps {
    onChange: (isChecked: boolean) => void;
    checked: boolean;
    children?: React.ReactChildren;
    className?: string;
}

export interface State {
    checked: boolean;
}

@PureRender
export class CheckboxInput extends React.Component<ICheckboxInputProps, State> {

    state: State = {
        checked: false
    };

    componentDidMount() {
        this.changeCheckedStateIfDifferentFromProp(this.props.checked);
    }

    componentWillReceiveProps(nextProps: ICheckboxInputProps) {
        this.changeCheckedStateIfDifferentFromProp(nextProps.checked);
    }

    private changeCheckedStateIfDifferentFromProp(propChecked: boolean): void {
        if (propChecked !== this.state.checked) {
            this.setState({ checked: propChecked });
        }
    }

    private handleClick = () => {
        const { checked } = this.state;
        this.props.onChange(!checked);
        this.setState({ checked });
    }

    render() {
        return (
            <label
                onClick={this.handleClick}
                className={classNames("checkbox-container", this.props.className, {
                    "checked": this.state.checked
                })}
            >
                <span className="checkbox" />
                {this.props.children}
            </label>
        )
    }
}