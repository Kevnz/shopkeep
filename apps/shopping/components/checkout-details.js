'use strict';
import React from 'react';
import ActionCreators from '../actions/action-creators';
import LineItem from './line-item';
import accounting from 'accounting';
import { Link } from 'react-router';
import CheckoutForm from './forms/checkout';
import Forms from 'newforms';
export default class CheckoutDetails extends React.Component {
    constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
    }
    componentDidMount () {

    }
    render() {

        return (
            <div className="checkout"> 
                <h3>Checkout - Continued</h3>
                <form onSubmit={this._onSubmit}>
                    <fieldset>
                        <legend>Your Details</legend>
                        <Forms.RenderForm form={CheckoutForm} ref="checkoutForm"/>
                        <button>Continue</button>
                    </fieldset>
                </form>

            </div>
            );
    }
    _onSubmit() {

    }
}