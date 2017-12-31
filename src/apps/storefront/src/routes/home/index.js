import React from 'react';
import Home from './home';
import Layout from '../../components/layout';

async function action({ fetch }) {
  const resp = await fetch.get('/v1/products', {});
  const { data: products } = resp;
 console.log('do stuff', products)
  return {
    chunks: ['home'],
    title: 'Shopkeep Storefront',
    component: (
      <Layout>
        <Home products={products} />
      </Layout>
    ),
  };
}

export default action;
