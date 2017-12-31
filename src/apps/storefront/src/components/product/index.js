import React from 'react';

class ProductCard extends React.Component {
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
      </div>
    );
  }
}

export default ProductCard;
