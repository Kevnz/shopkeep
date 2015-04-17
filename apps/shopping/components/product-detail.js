'use strict';
import React from 'react';
import ImageDisplay from './image-display';
import ActionCreators from '../actions/action-creators';
import { Router, Route, RouteHandler, Link } from 'react-router';

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.addToBasket=this.addToBasket.bind(this);
        
    }
    componentDidMount () {
        if(!this.props.products.selectedProduct || this.props.products.selectedProduct.slug !==this.context.router.getCurrentParams().slug ){
             ActionCreators.productSelected(this.context.router.getCurrentParams().slug);
        }
    }
    addToBasket(e) {
        e.preventDefault();
        console.log('addToBasket');
        ActionCreators.addToCart(this.props.products.selectedProduct._id);
    }
    render() {
        if (!this.props.products.selectedProduct) {
            return (<div className="loading">Loading</div>);  
        }
        let product = this.props.products.selectedProduct;
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
ProductDetail.contextTypes = {
  router: React.PropTypes.func
};