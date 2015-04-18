'use strict';
import express from 'express';
import { getCartCount } from '../../lib/middleware/carts'; 

var router = express.Router(); 

/* GET product listing. */
router.get('/', (req, res) => {
    if(req.session.cart) {
       res.send({count:req.session.cart.items.length}); 
   } else {
        res.send({count:0});
   }
    
});

router.post('/checkout/start', (req, res) => {
    if(!req.session.cart) {
        req.session.cart = {
            items: []
        };
    }
    req.session.cart.items.push({product: req.body.product, quantity: req.body.quantity});
    console.log(req.session);

    res.send(200);
});

router.post('/add', (req, res) => {
    if(!req.session.cart) {
        req.session.cart = {
            items: []
        };
    }
    let inCartAlready = false;
    req.session.cart.items.forEach((item) => {
        if(item === req.body.product) {
            item.quantity++;
            inCartAlready = true;
        }
    });
    if (inCartAlready) {
        req.session.cart.items.push({product: req.body.product, quantity: req.body.quantity});
            
    }
    console.log(req.session);

    res.send(200);
});
export default router;