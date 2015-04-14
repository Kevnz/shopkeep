'use strict';
import express from 'express';
import { allProductsForApiListing } from '../../db/products';
import { count } from '../../lib/middleware/aggregates';

var router = express.Router();
let productCount = count('products');

/* GET product listing. */
router.get('/', productCount, allProductsForApiListing, (req, res) => {
    res.send(req.apiData.products);
});

export default router;
