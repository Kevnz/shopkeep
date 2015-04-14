'use strict';
console.log('colCount');
export function count (collection) {
    console.log('countFunc');
    let db = require('mongo-start')(collection);
    return function (req, res, next) {
        console.log('middleware count');
        db.runCommand('count', function(err, result) {
            if(req.apiData === undefined) {
                req.apiData = {};
            }
            if(req.apiData[collection] === undefined) {
                req.apiData[collection] = {};
            }
            req.apiData[collection].total = result.n;
            next();
        });       
    };

}