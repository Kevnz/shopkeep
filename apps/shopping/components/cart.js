'use strict';
import React from 'react';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div> 
                <div>
                    <i className="fa fa-shopping-cart"></i>
                </div> 
            </div>
            );
    }
}