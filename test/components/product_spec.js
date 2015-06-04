'use strict';
var React = require('react/addons'),
        assert = require('assert'),
        TestUtils = React.addons.TestUtils,
        TopMenu = require('../../apps/shopping/components/top-menu');
var stubRouterContext = require('../utils/router-stub.js');
var Subject = stubRouterContext(TopMenu, {cartCount: '5'});
        
describe('Product component', function(){
    before('render and locate product element', function() {
        console.log('render into document');
        let urls = [{url: 'about:blank'}, {url:'http://lorempixel.com/g/400/200/'}];
        var renderedComponent = this.component = TestUtils.renderIntoDocument(<Subject  />); 
        this.cartLink = TestUtils.findRenderedDOMComponentWithClass(
            renderedComponent,
            'top-bar__cart'
        );
    });

    it('should have the count ', function() {  
        assert(this.cartLink.getDOMNode().querySelector('span:last-child').innerHTML === '5');
    });


});