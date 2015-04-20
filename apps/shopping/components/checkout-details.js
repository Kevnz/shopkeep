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

    }
    render() {

        return (
            <div className="checkout"> 
                <h3>Checkout</h3>
                

            </div>
            );
    }
}