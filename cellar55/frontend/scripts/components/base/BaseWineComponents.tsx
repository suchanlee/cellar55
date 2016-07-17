import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { isEqual, map, debounce } from 'lodash';

import { IWine } from '../../types/wine';

const PAGE_SIZE = 10;
const BOTTOM_SCROLL_PADDING = 100;
const DEBOUNCE_MILLIS = 50;

export interface IWineListProps {
    wineIds: number[];
    wineItems: React.ReactElement<any>[];
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

@PureRender
export class BaseWineList extends React.Component<IWineListProps, IWineListState> {

    state: IWineListState = {
        pages: 1
    };

    private debouncedScrollHandler: any;

    componentDidMount() {
        this.debouncedScrollHandler = debounce(this.handleScroll, DEBOUNCE_MILLIS);
        window.addEventListener('scroll', this.debouncedScrollHandler);
    }

    componentWillReceiveProps(nextProps: IWineListProps) {
        if (!isEqual(this.props.wineIds, nextProps.wineIds)) {
            this.setState({ pages: 1 });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debouncedScrollHandler);
    }

    private renderWineItems(): React.ReactElement<any> | React.ReactElement<any>[] {
        if (this.props.wineItems.length > 0) {
            return this.props.wineItems.slice(0, PAGE_SIZE * this.state.pages);
        }
        return (
            <div className="wine-list-empty">
                No wines matching search criteria.
            </div>
        );
    }

    private handleScroll = (evt: Event) => {
        const pos = evt.target["scrollHeight"] - window.screen.height - evt.target["scrollTop"] - 60;
        if (pos < BOTTOM_SCROLL_PADDING) {
            this.setState({ pages: this.state.pages + 1 });
        }
    }

    render() {
        return (
            <ul
                className='wine-list'
                onScroll={this.handleScroll}
            >
                {this.renderWineItems()}
            </ul>
        );
    }
}

@PureRender
export abstract class BaseWineItem<T extends IWineItemProps> extends React.Component<T, void> {

    protected getWineName(): IWineName {
        const nameSplit = this.props.wine.name.split(',');
        return {
            winery: nameSplit[0],
            rest: nameSplit.slice(1).join(', ')
        };
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

    protected renderWineMetadata(): React.ReactElement<any> {
        const { wine } = this.props;
        return (
            <div className="wine-item-metadata">
                <span>{this.getRegion()}</span>
                {this.isEmptyValue(wine.vintage) ? null :
                    <span>
                        <span className="wine-item-metadata-divider" />
                        <span>{wine.vintage}</span>
                    </span>
                }
                {this.isEmptyValue(wine.vintage) ? null :
                    <span>
                        <span className="wine-item-metadata-divider" />
                        <span>{wine.varietal}</span>
                    </span>
                }
            </div>
        )
    }

    render() {
        return null;
    }
}
