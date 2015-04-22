'use strict';
import React from 'react';
import ActionCreators from '../actions/action-creators';
import LineItem from './line-item';
import accounting from 'accounting';
import { Link } from 'react-router';

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        if(!this.props.cart.checkout){
            ActionCreators.checkoutStarted();
        }
    }
    render() {

        let lineItems = !this.props.cart.checkout ? (<div>Nope</div>) : this.props.cart.checkout.contents.map((item) => {
            return (<LineItem entry={item}></LineItem>);
        });
        let totalCost = !this.props.cart.checkout ? '0.00' : this.props.cart.checkout.totalCost;
        return (
            <div className="checkout"> 
                <h3>Checkout</h3>
                <div className="checkout__line-items">
                    {lineItems}
                </div>
                <div className="checkout__total">Total: {accounting.formatMoney(totalCost)} </div>
                <Link to="details" className="checkout__btn">Checkout</Link>
            </div>
            );
    }
}