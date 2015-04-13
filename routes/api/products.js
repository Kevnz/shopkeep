'use strict';
import express from 'express';
import { allProductsForApiListing } from '../../db/products';
var router = express.Router();

/* GET home page. */
router.get('/', allProductsForApiListing, (req, res) => {
  res.send(req.apiData.products);
});

export default router;
