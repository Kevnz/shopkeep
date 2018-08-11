import React from 'react';
import Cart from './cart';
import Layout from '../../components/layout';

async function action({ fetch }) {
  const resp = await fetch.get('/v1/cart', {});
  const { data: items } = resp;
  return {
    chunks: ['cart'],
    title: 'Cart Content',
    component: (
      <Layout>
        <Cart />
      </Layout>
    ),
  };
}

export default action;
