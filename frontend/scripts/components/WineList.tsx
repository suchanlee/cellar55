import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { map } from 'lodash';

import { IWine } from '../types/wine';
import WineItem from './WineItem';

const PAGE_SIZE = 10;
const BOTTOM_SCROLL_PADDING = 100;

interface Props {
    searchQuery: string;
    wines: IWine[];
}

interface State {
    pages: number;
}

@PureRender
export default class WineList extends React.Component<Props, State> {

    state: State = {
        pages: 1
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({ pages: 1 });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    private renderWineItems(): React.ReactElement<any>[] {
        const query = this.props.searchQuery.toLowerCase().trim();
        let wines: IWine[] = [];
        let wineItems: React.ReactElement<any>[] = [];
        for (var wine of this.props.wines) {
            const content = `${wine.name} ${wine.country} ${wine.region} ${wine.subregion}
             ${wine.varietal} ${wine.wine_type} ${wine.vintage}`.toLowerCase();
            if (content.indexOf(this.props.searchQuery) > -1) {
                wines.push(wine);
            }
        }
        return map(wines.slice(0, PAGE_SIZE * this.state.pages), wine =>
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
            <ul className='wine-list'>
                {this.renderWineItems()}
            </ul>
        );
    }
}