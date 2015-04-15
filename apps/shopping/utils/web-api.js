'use strict';
import request from 'superagent';
import ActionCreators from '../actions/action-creators';

const PRODUCTS_URI = '/api/products';

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
    }
};