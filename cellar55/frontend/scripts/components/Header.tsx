import * as React from 'react';
import * as PureRender from 'pure-render-decorator';
import { Link } from "react-router";

@PureRender
export default class Header extends React.Component<void, void> {

    render() {
        return (
            <header>
                <div className="logo-container">
                    <h1 className="logo">
                        <Link to="/">fifty-five</Link>
                    </h1>
                </div>
                <ul className="nav-list">
                </ul>
            </header>
        )
    }
}