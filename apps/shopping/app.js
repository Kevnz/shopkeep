'use strict';
import React from 'react';
import Shopkeep from './components/shopkeep-app';
var appElement = document.getElementById('app');
var api = require('./utils/web-api');

api.getAllProducts();

React.render(<Shopkeep  />, appElement);