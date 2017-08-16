import * as React from "react";
import * as classNames from "classnames";

export interface ICheckboxInputProps {
  onChange: (isChecked: boolean) => void;
  checked: boolean;
  className?: string;
}

export interface State {
  checked: boolean;
}

export class CheckboxInput extends React.PureComponent<
  ICheckboxInputProps,
  State
> {
  public state: State = {
    checked: false
  };

  public componentDidMount() {
    this.changeCheckedStateIfDifferentFromProp(this.props.checked);
  }

  public componentWillReceiveProps(nextProps: ICheckboxInputProps) {
    this.changeCheckedStateIfDifferentFromProp(nextProps.checked);
  }

  public render() {
    return (
      <label
        onClick={this.handleClick}
        className={classNames("checkbox-container", this.props.className, {
          checked: this.state.checked
        })}
      >
        <span className="checkbox" />
        {this.props.children}
      </label>
    );
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
  };
}
