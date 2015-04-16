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
                'checkoutStarted'
            );
    }
    addToCart(productKey) {
        this.dispatch(productKey);
        api.addToCart(productKey);
    }

}
alt.createActions(ActionsCreators, exports);