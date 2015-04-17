'use strict';
import React from 'react';
import ImageDisplay from './image-display';
import ActionCreators from '../actions/action-creators';
import { Router, Route, RouteHandler, Link } from 'react-router';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.addToBasket=this.addToBasket.bind(this);
        console.log(this);
    }
    addToBasket(e) {
        e.preventDefault();
        console.log('addToBasket');
        ActionCreators.addToCart(this.props.product._id);
    }
    render() {
        let product = this.props.product;
        return (
            <div className="product-listing"> 
                <h3><Link to={'/product/' +product.slug}>{product.name}</Link></h3>
                <ImageDisplay images={product.images} />
                <div>${product.price}</div>
                <button className="btn-add" onClick={this.addToBasket}>Add to cart</button> 
            </div>
            );
    }
}
Product.contextTypes = {
  router: React.PropTypes.func
};