import React from 'react';
import accounting from 'accounting';

export default class LineItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
            <div className="checkout__line-item"> 
                <div>{this.props.entry.product.name}</div>
                <div>{this.props.entry.quantity}</div>
                <div>{accounting.formatMoney(this.props.entry.product.price)}</div> 
            </div>
            );
    }
}