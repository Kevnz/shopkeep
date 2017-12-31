import React from 'react';
import ProductCard from '../../components/product';
class Home extends React.Component {
  render() {
    const products = this.props.products.map(p => <ProductCard product={p} key={`p-${p.identifier}`} />)
    return (
      <div >
        <div>
          <h1>Buy Stuff</h1>
          {products}
        </div>
      </div>
    );
  }
}

export default Home;
