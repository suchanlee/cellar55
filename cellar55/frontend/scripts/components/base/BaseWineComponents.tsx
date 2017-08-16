import * as React from "react";
import { isEqual } from "lodash";

import { IWine } from "../../types/wine";

const PAGE_SIZE = 10;
const BOTTOM_SCROLL_PADDING = 100;
const DEBOUNCE_MILLIS = 50;

export interface IWineListProps {
  wineIds: number[];
  wineItems: JSX.Element[];
}

export interface IWineItemProps {
  wine: IWine;
}

export interface IWineListState {
  pages: number;
}

export interface IWineName {
  winery: string;
  rest: string;
}

export class BaseWineList extends React.PureComponent<
  IWineListProps,
  IWineListState
> {
  public state: IWineListState = {
    pages: 1
  };

  public componentWillReceiveProps(nextProps: IWineListProps) {
    if (!isEqual(this.props.wineIds, nextProps.wineIds)) {
      this.setState({ pages: 1 });
    }
  }

  public render() {
    return (
      <ul className="wine-list" onScroll={this.handleScroll}>
        {this.renderWineItems()}
      </ul>
    );
  }

  private renderWineItems(): JSX.Element | JSX.Element[] {
    if (this.props.wineItems.length > 0) {
      return this.props.wineItems.slice(0, PAGE_SIZE * this.state.pages);
    }
    return (
      <div className="wine-list-empty">No wines matching search criteria</div>
    );
  }

  private handleScroll = (evt: React.SyntheticEvent<HTMLUListElement>) => {
    const pos =
      evt.currentTarget.scrollHeight -
      window.screen.height -
      evt.currentTarget.scrollTop -
      60;
    if (pos < BOTTOM_SCROLL_PADDING) {
      this.setState({ pages: this.state.pages + 1 });
    }
  };
}

export abstract class BaseWineItem<
  T extends IWineItemProps
> extends React.PureComponent<T, {}> {
  public render() {
    return <div />;
  }

  protected getWineName(): IWineName {
    const nameSplit = this.props.wine.name.split(",");
    return {
      rest: nameSplit.slice(1).join(", "),
      winery: nameSplit[0]
    };
  }

  protected renderWineMetadata(): React.ReactElement<any> {
    const { wine } = this.props;
    return (
      <div className="wine-item-metadata">
        <span>
          {this.getRegion()}
        </span>
        {this.isEmptyValue(wine.vintage)
          ? undefined
          : <span>
              <span className="wine-item-metadata-divider" />
              <span>
                {wine.vintage}
              </span>
            </span>}
        {this.isEmptyValue(wine.vintage)
          ? undefined
          : <span>
              <span className="wine-item-metadata-divider" />
              <span>
                {wine.varietal}
              </span>
            </span>}
      </div>
    );
  }

  private getRegion(): string {
    const { wine } = this.props;
    if (this.isEmptyValue(wine.subregion)) {
      return wine.region;
    }
    return `${wine.subregion}, ${wine.region}`;
  }

  private isEmptyValue(value: string): boolean {
    return value.trim().length === 0 || value.toLowerCase() === "n/a";
  }
}
