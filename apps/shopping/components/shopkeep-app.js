'use strict';
import React from 'react';
import ProductStore from '../stores/product-store';
import CartStore from '../stores/cart-store';
import ProductList from './product-list';
import TopMenu from './top-menu';
function _getStateFromStores () {
    console.log('_getStateFromStores');
    var returnState = {
        products: ProductStore.getState(),
        cart: CartStore.getState()
    };
    console.log(returnState);
    return returnState;
}

export default class Shopkeep extends React.Component {
    constructor(props) {
        super(props);
        this.state = _getStateFromStores();
    }
    componentDidMount () {
        ProductStore.listen(this._onChange.bind(this));
        CartStore.listen(this._onChange.bind(this));
    }
    componentWillUnmount () {
        ProductStore.unlisten(this._onChange.bind(this));
        CartStore.unlisten(this._onChange.bind(this));
    }
    render() {
        return (
            <div>
                <TopMenu cartCount={this.state.cart.count} />
            <div className="app">
                <ProductList products={this.state.products}></ProductList>
            </div>
            </div>
        );
    }
    _onChange () {
        console.log('_onChange');
        this.setState(_getStateFromStores());
    }
}