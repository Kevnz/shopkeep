'use strict';
import Table from 'cli-table';

export function routeListing (stack, root) {
    let table = new Table({ head: ['Verb', 'Path'] });

    let routes = stack;

    for (let key in routes) {

        if (routes.hasOwnProperty(key)) {
            let val = routes[key];
            //console.log(val);
            if(val.route) {
                val = val.route;
                let _o = {};
                _o[val.stack[0].method]  = [root + val.path];    
                table.push(_o);
            }
            if(val.name && val.name === 'router') {
                //console.log(val);
                let prefix = val.regexp.toString()
                    .replace('/^\\', '')
                    .replace('\\', '')
                    .replace('\\/', '')
                    .replace('?(?=\\/|$)/i', '')
                    .replace('?(?=|$)/i/','')
                    .replace('/?(?=/|$)/i', '')
                    .replace('?(?=|$)/i/', '');
                routeListing(val.handle.stack, prefix);
            }       
        }
    }

    console.log(table.toString());
}