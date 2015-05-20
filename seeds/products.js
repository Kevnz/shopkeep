'use strict';
export function addProduct (casual) {
    var catagories = ['Interesting', 'Exciting', 'Outrageous'];
    casual.define('product', function() {

        return {
            name: casual.catch_phrase,
            description: casual.description,
            catagory: catagories[casual.integer(0,2)],
            price: casual.integer(1,213) + '.' + casual.integer(10,99),
            images: [{
                name:casual.words(4), 
                url: 'http://lorempixel.com/400/200/technics' 
            },
            {
                name:casual.words(5),
                url: 'http://lorempixel.com/400/200/cats/'
            },
            {
                name:casual.words(5),
                url:  'http://lorempixel.com/400/200/sports' 
            },
            {
                name:casual.words(5),
                url: 'http://lorempixel.com/400/200/transport' 
            }
            ]
        };
    });
}