'use strict';
var React = require('react/addons'),
        assert = require('assert'),
        ImageDisplay = require('../../apps/shopping/components/image-display'),
        TestUtils = React.addons.TestUtils;

describe('ImageDisplay component', function(){
    before('render and locate element', function() {
        let urls = [{url: 'about:blank'}, {url:'http://lorempixel.com/g/400/200/'}];
        
        var renderedComponent = this.component = TestUtils.renderIntoDocument(<ImageDisplay images={urls}  />);
        this.image = TestUtils.findRenderedDOMComponentWithTag(
            renderedComponent,
            'img'
        );
    });

    it('<img> should be ', function() { 
        assert(this.image.getDOMNode().src === 'about:blank');
    });


});