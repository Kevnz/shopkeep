'use strict';
import React from 'react';

export default class Customer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div> 
                <div className="primary-image"><img src={this.props.images[0].url} /></div>

            </div>
            );
    }
}