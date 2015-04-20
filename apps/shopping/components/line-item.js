import React from 'react';
import accounting from 'accounting';

export default class LineItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="checkout__line-item"> 
                <div>{this.props.entry.item.name}</div>
                <div>{this.props.entry.quantity}</div>
                <div>{accounting.formatMoney(this.props.entry.cost)}</div> 
            </div>
            );
    }
}