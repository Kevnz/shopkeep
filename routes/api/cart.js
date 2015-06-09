'use strict';
import express from 'express';
import { getCartCount, getCartItemsFromSession } from '../../lib/middleware/carts'; 
import BigNumber from 'bignumber.js';
var router = express.Router(); 

/* GET product listing. */
router.get('/', (req, res) => {
    if(req.session.cart) {
       res.send({count:req.session.cart.items.length}); 
   } else {
        res.send({count:0});
   }
    
});

router.post('/checkout/start', getCartItemsFromSession, (req, res) => {
    if(!req.session.cart) {
        res.send(412, 'You have no items in your cart');
        return;
    }
    res.send(req.session.cart);
});

router.post('/add', (req, res) => {
    let { product, quantity } = req.body;
    if(!req.session.cart) {
        req.session.cart = {
            items: []
        };
    }
    let inCartAlready = false;
    req.session.cart.items.forEach((item) => {
        if(item.product._id === product._id) {
            item.quantity = item.quantity + quantity;
            inCartAlready = true;
        }
    });
    if (!inCartAlready) {
        req.session.cart.items.push({product: product, quantity: quantity});
    }
 
    var costs = req.session.cart.items.map(( item) => {
        return (new BigNumber(item.product.price)).mul(item.quantity).toString();
    }); 
    console.log('costs',costs); 

    req.session.cart.cost = costs.reduce(function(previousValue, currentValue, index, array) {
        return (new BigNumber(previousValue)).add(currentValue).toString();
    });

    console.log(req.session.cart);
    
    res.status(200).send(req.session.cart);

});
export default router;