'use strict';
import React from 'react';
import ProductStore from '../stores/product-store';
import ProductList from './product-list';
function _getStateFromStores () {
    console.log('_getStateFromStores');
    var returnState = {
        products: ProductStore.getState()
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
    }
    componentWillUnmount () {
        ProductStore.unlisten(this._onChange.bind(this));
    }
    render() {
        return (
            <div className="app">
                <TopMenu />
                <ProductList products={this.state.products}></ProductList>
            </div>
        );
    }
    _onChange () {
        console.log('_onChange');
        this.setState(_getStateFromStores());
    }
}