import React from 'react';

class ProductCard extends React.Component {
    handleAddToCart() {
      console.log('add this to the cart', this);
      const { identifier } = this.props.product;
      this.props.addToCartAction(identifier);

    }
  render() {
    const { product } = this.props;
    return (
      <div className="card" style={{display: 'inline-block'}}>
        <img
          src={product.images[0].thumbnail}
          alt=""
          className="section media" />
        <div className="section darker"><h3>{product.name}</h3></div>
        <div className="section double-padded"><p>{product.description}</p></div>
        <div className="section">
          <input type="button" className="primary" value="Add to Cart" onClick={::this.handleAddToCart} />
        </div>
      </div>
    );
  }
}

export default ProductCard;
