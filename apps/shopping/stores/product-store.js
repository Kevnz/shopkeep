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
    onProductSelected (productKey) {
        console.log('page');
        this.selectedProduct = this.products.filter((item) => item.slug === productKey)[0];
    }
    getSelectedProduct (slug) {
        let productsFiltered = this.products.filter((item) => {
            return item.slug === slug;
        });
        this.selectedProduct = productsFiltered[0];
    }
}

module.exports = alt.createStore(ProductStore);