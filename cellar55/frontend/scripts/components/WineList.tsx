import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { isEqual, map, debounce } from 'lodash';

import { IWine } from '../types/wine';
import WineItem from './WineItem';

const PAGE_SIZE = 10;
const BOTTOM_SCROLL_PADDING = 100;
const DEBOUNCE_MILLIS = 50;

interface Props {
    searchQuery: string;
    filteredWines: IWine[];
}

interface State {
    pages: number;
}

@PureRender
export default class WineList extends React.Component<Props, State> {

    state: State = {
        pages: 1
    };

    private debouncedScrollHandler: any;

    componentDidMount() {
        this.debouncedScrollHandler = debounce(this.handleScroll, DEBOUNCE_MILLIS);
        window.addEventListener('scroll', this.debouncedScrollHandler);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!isEqual(
            map(this.props.filteredWines, (w) => w.id),
            map(nextProps.filteredWines, (w) => w.id))) {
            this.setState({ pages: 1 });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.debouncedScrollHandler);
    }

    private renderWineItems(): React.ReactElement<any>[] {
        return map(this.props.filteredWines.slice(0, PAGE_SIZE * this.state.pages), wine =>
            <WineItem key={wine.id} wine={wine} />);
    }

    private handleScroll = (evt: Event) => {
        const pos = document.body.offsetHeight - window.screen.height - evt.srcElement['body'].scrollTop;
        if (pos < BOTTOM_SCROLL_PADDING) {
            this.setState({ pages: this.state.pages + 1 });
        }
    }

    render() {
        return (
            <ul className='wine-list'>{this.renderWineItems()}</ul>
        );
    }
}