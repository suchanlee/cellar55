import * as React from 'react';
import * as PureRender from 'pure-render-decorator';

@PureRender
export default class Header extends React.Component<void, void> {

    render() {
        return <header>fifty-five</header>
    }
}