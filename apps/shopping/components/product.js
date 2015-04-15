import React from 'react';
import ImageDisplay from './image-display';
export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.addToBasket=this.addToBasket.bind(this);
        console.log(this);
    }
    addToBasket(e) {
        e.preventDefault();
    }
    render() {
        let product = this.props.product;
        return (
            <div className="product-listing"> 
                <h3>{product.name}</h3>
                <ImageDisplay images={product.images} />
                <div>${product.price}</div>
                <button className="btn-add" onClick={this.addToBasket}>Add to cart</button> 
            </div>
            );
    }
}