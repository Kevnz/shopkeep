'use strict';
import request from 'superagent';
import ActionCreators from '../actions/action-creators';

const PRODUCTS_URI = '/api/products';
const CART_URI = '/api/cart';
export default {
    getAllProducts: function () {
        request.get(PRODUCTS_URI)
            .end((err, res) => {
                console.log('receivePages');
                console.log(res);
                ActionCreators.receiveProducts(res.body);
            });
    },
    getProduct: function (id) {
        request.get(PRODUCTS_URI + '/' + id)
            .end((err, res) => { 
                console.log(res);
                ActionCreators.receiveProduct(res.body);
            });
    },
    getCartCount: function () {
       request.get(CART_URI)
            .end((err, res) => { 
                console.log(res);
                ActionCreators.receiveCartCount(res.body.count);
            }); 
    },
    addToCart: function (product, quantity = 1) {
        request.post(CART_URI + '/add')
            .send({ product: product, quantity: quantity })
            .end((err, res) => { 
                console.log(res);
                ActionCreators.itemAddedToCart(res.body);
            });
    },
    startCheckout: function () {
        console.log('startCheckout');
        request.post(CART_URI + '/checkout/start')
            .send({test:'test'})
            .end((err, res) => {
                console.log('back');
                console.log(res);
                ActionCreators.receiveCart(res.body);
            });
    }
};