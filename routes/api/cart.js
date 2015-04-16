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

router.post('/add', (req, res) => {
    if(!req.session.cart) {
        req.session.cart = {
            items: []
        };
    }
    req.session.cart.items.push({product: req.body.product, quantity: req.body.quantity});
    console.log(req.session);

    res.send(200);
});
export default router;