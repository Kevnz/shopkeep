'use strict';
import alt from '../alt';
import api from '../utils/web-api';

class ActionsCreators {
    constructor() {
        this.generateActions(
                'receiveProducts',
                'receiveCartCount',
                'receiveProduct',
                'productSelected',
                'removeFromCart',
                'receiveCart',
                'itemAddedToCart'
            );
    }
    addToCart(product) {
        this.dispatch('product');
        api.addToCart(product);
    }
    checkoutStarted () {
        this.dispatch('checkout');
        api.startCheckout();
    }

}
alt.createActions(ActionsCreators, exports);