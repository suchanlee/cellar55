import * as React from 'react';
import objectAssign = require('object-assign');
import queryString = require('query-string');

import Filters from './Filters';
import WineItem from './WineItem';

interface Props {
}

interface State {
    count: number;
    wines: Types.Wine[];
    filters: Types.Filters;
}

const baseUrl: string = '/api/wine';

export default class Body extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0,
            wines: [],
            filters: this.getInitialFilters()
        };
    }

    componentDidMount() {
        this.fetchWines();
    }

    private getInitialFilters(): Types.Filters {
        return {
            countries: [],
            regions: [],
            subregions: [],
            wine_types: [],
            varietals: [],
            vintage: '',
            vintage_from: '',
            vintage_to: '',
            name: ''
        };
    }

    private fetchWines(): void {
        fetch(`${baseUrl}?${queryString.stringify(this.state.filters)}`)
            .then((response: Response) => {
                if (response.status >= 200) {
                    return response
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((response: Response) => {
                return response.json();
            })
            .then((data: Types.WineResponse) => {
                this.setState(objectAssign({}, this.state, data));
            });
    }

    private handleFiltersUpdate(delta: Types.FiltersDelta): void {
        this.setState({
            count: this.state.count,
            wines: this.state.wines,
            filters: objectAssign({}, this.state.filters, delta)
        }, () => this.fetchWines());
    }

    private renderWineItems(): React.ReactElement<any>[] {
        let wineItems: React.ReactElement<any>[] = [];
        for (var wine of this.state.wines) {
            wineItems.push(<WineItem key={wine.id} wine={wine} />)
        }
        return wineItems;
    }

    render() {
        return (
            <div>
                <Filters
                    wines={this.state.wines}
                    filters={this.state.filters}
                    onFiltersUpdate={(delta: Types.FiltersDelta) => this.handleFiltersUpdate(delta)}
                 />
                <ul className='wine-list'>
                    {this.renderWineItems()}
                </ul>
            </div>
        )
    }
}