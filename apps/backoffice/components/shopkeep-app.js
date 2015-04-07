import React from 'react';
import LoginLink from './login-link';

export default class Shopkeep extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <div className="pure-u">
                <LoginLink />
                </div>
            </div>
        );
    }
}