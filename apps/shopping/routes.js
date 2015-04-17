'use strict';
import React from 'react';
import { Route, DefaultRoute  } from 'react-router';
import Shopkeep from './components/shopkeep-app';
import Products from './components/product-list';
import ProductDetail from './components/product-detail';
export default (
    <Route name='main' path='/' handler={Shopkeep}>
        <DefaultRoute name="productlist" handler={Products} />
        <Route name='productlisting' path='/product/:slug' handler={ProductDetail} />
    </Route>
);