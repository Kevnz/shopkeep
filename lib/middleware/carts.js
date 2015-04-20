'use strict';
import mongojs from 'mongojs';
import db from 'mongo-start';
import money from 'money-math';

export function getCartCount (req, res, next) {

    next();
}

export function getCartItemsFromSession (req, res, next) {
    if(req.apiData === undefined) {
        req.apiData = {};
    }
    req.apiData.cart = {};
    if(!req.session.cart) {
        next();
        return;
    }
    // now move teh cart from session to actual db entry
    let cart = {
        lineItems:[]
    };
    let queryArr = [];

    for (var i = 0; i < req.session.cart.items.length; i++) {
        cart.lineItems[req.session.cart.items[i].product] = req.session.cart.items[i];
        queryArr.push({_id: mongojs.ObjectId(req.session.cart.items[i].product) });

    }
    let query = { $or: queryArr };
    let products = db('products');
    products.find(query, function (err, items) {
        if (err) {
            console.log(err);
            return;
        }
        let cartContents = items.map((item) => {
            return {
                quantity: cart.lineItems[item._id].quantity,
                item: item,
                cost: (cart.lineItems[item._id].quantity * item.price)
            };
        });

        req.apiData.cart.contents = cartContents;
        let total = '0';
        req.apiData.cart.totalCost = cartContents.forEach((item) => {
            console.log(item);
            total = money.add(item.cost.toString() , total);
        });
        req.apiData.cart.totalCost = total;
        next();

    });
}