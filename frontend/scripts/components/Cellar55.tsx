import * as React from 'react';

import Body from './Body.tsx';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

interface Props {}

interface State {
    count: number;
    wines: Types.Wine[];
}

export default class Cellar55 extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            wines: []
        };
    }

    render() {
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}