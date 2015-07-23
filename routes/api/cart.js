'use strict';
import express from 'express';
import { getCartCount, getCartItemsFromSession } from '../../lib/middleware/carts'; 
import BigNumber from 'bignumber.js';
import { productsById } from '../../db/products';
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
    try {
    let { product, quantity } = req.body;
    let cart;
    if(!req.session.cart) {
        req.session.cart = {};
        cart = {
            items: []
        };
    } else {
        cart = req.session.cart;
    }
    
    let inCartAlready = false;
    cart.items.forEach((item) => {
        if(item.product._id === product._id) {
            item.quantity = item.quantity + quantity;
            inCartAlready = true;
        }
    });
    if (!inCartAlready) {
        cart.items.push({product: product._id, quantity: quantity});
    }
    console.log(productsById);
    productsById(cart.items.map(item=>item._id), (err, products) => {
        if(err) {
            console.log('err', err);

        }

        let costs = products.map(( item) => {
            return (new BigNumber(item.product.price)).mul(item.quantity).toString();
        });
        console.log('costs', costs); 

        req.session.cart.cost = costs.reduce(function(previousValue, currentValue, index, array) {
            return (new BigNumber(previousValue)).add(currentValue).toString();
        });
        req.session.cart.items = products;
        console.log(req.session.cart);
        
        res.status(200).send(req.session.cart);
    });

    }catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
export default router;