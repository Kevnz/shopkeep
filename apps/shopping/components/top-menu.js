'use strict';
import React from 'react';
import { Router, Route, RouteHandler, Link } from 'react-router';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.cartCount);
        let countDisplay = this.props.cartCount === 0 ? '': this.props.cartCount;
        return (
            <div className="top-bar"> 
                <a href="#"className="top-bar__logo">Shopkeep</a>
                <a href="#" className="top-bar__cart"> {countDisplay}</a>
            </div>
            );
    }
}