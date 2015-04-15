'use strict';
import alt from '../alt.js';
import ActionCreators from '../actions/action-creators';

class ProductStore {
    constructor() {
        this.bindActions(ActionCreators);
        this.products = [];
    }
    onReceiveProducts (products) {
        console.log(products);
        this.products = products.items;
    }
    onProductSelected (product) {
        console.log('page');
        this.selectedProduct = product;
    }
}

module.exports = alt.createStore(ProductStore);