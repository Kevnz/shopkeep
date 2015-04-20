'use strict';
import React from 'react';
import { Route, DefaultRoute  } from 'react-router';
import Shopkeep from './components/shopkeep-app';
import Products from './components/product-list';
import ProductDetail from './components/product-detail';
import Checkout from './components/checkout';
import CheckoutDetails from './components/checkout-details';
export default (
    <Route name='main' path='/' handler={Shopkeep}>
        <DefaultRoute name="productlist" handler={Products} />
        <Route name='productlisting' path='/product/:slug' handler={ProductDetail} />
        <Route name='checkout' handler={Checkout}>
            <Route name="details" handler={CheckoutDetails} />
        </Route>
    </Route>
);