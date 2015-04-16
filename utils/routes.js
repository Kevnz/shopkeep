'use strict';
import Table from 'cli-table';

export function routeListing (stack, root) {
    let table = new Table({ head: ['Verb', 'Path'] });

    let routes = stack;
    console.log(stack.length);
    for (let key in routes) {
        if (routes.hasOwnProperty(key)) {
            let val = routes[key];
            if(val.route) {
                val = val.route;
                let _o = {};
                _o[val.stack[0].method]  = [root + val.path];    
                table.push(_o);
            }       
        }
    }

    console.log(table.toString());
}