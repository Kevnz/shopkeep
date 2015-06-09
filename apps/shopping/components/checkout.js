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

        let lineItems = this.props.cart.cartContents.items.length === 0 ? (<div>Nope</div>) : this.props.cart.cartContents.items.map((item) => {
            return (<LineItem entry={item}></LineItem>);
        });
        let cost = this.props.cart.cartContents.cost;

        return (
            <div className="checkout"> 
                <h3>Checkout</h3>
                <div className="checkout__line-items">
                    {lineItems}
                </div>
                <div className="checkout__total">Total: {accounting.formatMoney(cost)} </div>
                <Link to="details" className="checkout__btn">Checkout</Link>
            </div>
            );
    }
}