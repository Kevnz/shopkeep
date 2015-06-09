'use strict';
import alt from '../alt.js';
import ActionCreators from '../actions/action-creators';

class CartStore {
    constructor() {
        this.bindActions(ActionCreators);
        this.count = 0;
    }
    onReceiveCartCount (cartCount) {
        this.count = cartCount;
    }
    onAddToCart() {
        console.log('onAddToCart');
        this.count++;
    }
    onItemAddedToCart(contents) {
        this.cartContents = contents;
    }
    onReceiveCart(cart) {
        this.checkout = cart;
    }
}

module.exports = alt.createStore(CartStore);