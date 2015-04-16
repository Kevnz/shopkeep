import React from 'react';
import Cart from './cart';
export default class CartList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cartNodes = this.state.settings.map((cart) => {
            return (<Cart cart={cart} />);
        });
        return (
            <div> 
                {cartNodes} 
            </div>
            );
    }
}