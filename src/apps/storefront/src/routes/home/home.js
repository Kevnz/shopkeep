import React from 'react';
import ProductCard from '../../components/product';
class Home extends React.Component {
  render() {
    const { products, addToCartAction } = this.props;
    const productList = products.map(p => <ProductCard product={p} key={`p-${p.identifier}`} addToCartAction={addToCartAction} />)
    return (
      <div >
        <div>
          <h1>Buy Stuff</h1>
          {productList}
        </div>
      </div>
    );
  }
}

export default Home;
