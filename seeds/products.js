'use strict';
export function addProduct (casual) {
    casual.define('product', function() {
        return {
            name: casual.catch_phrase,
            description: casual.description,
            catagory: 'Test',
            images: [{name:casual.words(4), url:'http://placehold.it/350x150'},
            {name:casual.words(5), url:'http://placehold.it/350x150'}]
        };
    });
}