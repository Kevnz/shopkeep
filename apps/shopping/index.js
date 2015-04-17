'use strict';
import React from 'react';
import router from './router';
var appElement = document.getElementById('app');
var api = require('./utils/web-api');

api.getAllProducts();
api.getCartCount();


router.run((Handler, state) => {
    React.render(<Handler {...state} />, appElement);
});