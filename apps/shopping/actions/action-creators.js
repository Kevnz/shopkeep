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
                'receiveCart'
            );
    }
    addToCart(productKey) {
        this.dispatch(productKey);
        api.addToCart(productKey);
    }
    checkoutStarted () {
        this.dispatch('checkout');
        api.startCheckout();
    }

}
alt.createActions(ActionsCreators, exports);