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
    addToCart: function (id, quantity = 1) {
        request.post(CART_URI + '/add')
            .send({ product: id, quantity: quantity })
            .end((err, res) => { 
                console.log(res);
                ActionCreators.receiveProduct(res.body);
            });
    }
};