'use strict';
import db from 'mongo-start';

let products = db('products');
export function allProductsForApiListing(req, res, next) {
    products.find((err, items) => {
        if(req.apiData === undefined) {
            req.apiData = {};
        }
        req.apiData.products = items;
        next();
    });
}