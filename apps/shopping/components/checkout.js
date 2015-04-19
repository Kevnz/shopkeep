'use strict';
import React from 'react';
import ActionCreators from '../actions/action-creators';
import { Router, Route, RouteHandler, Link } from 'react-router';

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        console.log('cdm');
        if(!this.props.cart.checkout){
            console.log('cdm no co');
             ActionCreators.checkoutStarted();
        }
    }
    render() {

        let lineItems = !this.props.cart.checkout ? (<div>Nope</div>) : this.props.cart.checkout.lineItems.map((item) => {
            return (<div> Item </div>);
        })
        return (
            <div> 
                <div className="checkout"><h3>Checkout</h3></div>
                <div className="">
                    {lineItems}
                </div>
            </div>
            );
    }
}