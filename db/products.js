'use strict';
import db from 'mongo-start';

let products = db('products');
export function allProductsForApiListing(req, res, next) {
    let pageSize = 20;
    let skip = Number(req.query.start) || 0;

    products.find({}, { skip: skip, limit: pageSize },(err, items) => {
        console.log('allProductsForApiListing');
        if(req.apiData === undefined) {
            req.apiData = {};
        }
        if(req.apiData.products === undefined) {
            req.apiData.products = {};
        }
        req.apiData.products.meta = {
            nextPage: pageSize + skip,
            previousPage: skip - pageSize  > 0 ? skip - pageSize : 0
        };
        req.apiData.products.items = items;
        next();
    });
}

export function productCount (req, res, next) {
    products.runCommand('count', function(err, result) {
        if(req.apiData === undefined) {
            req.apiData = {};

        }
        if(req.apiData.products === undefined) {
            req.apiData.products = {};
        }
        req.apiData.products.total = result.n;
        next();
    });
}

export function productsById (ids, callback) {
    console.log('productsById') 
    let ObjectId = require('mongo-start/mongojs').ObjectId;
    let objectIds = ids.map(id=> ObjectId(id));
    console.log(objectIds);
    let query = { _id : { $in: objectIds }};
    console.log(query);
    products.find(query, callback);
}