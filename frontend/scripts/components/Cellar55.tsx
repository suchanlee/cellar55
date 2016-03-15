import * as React from 'react';

import Body from './Body.tsx';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

export default class Cellar55 extends React.Component<void, void> {

    componentDidMount() {
        fetch('/wine', {
            method: 'get'
        }).then((response) => console.log(response.json()));
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