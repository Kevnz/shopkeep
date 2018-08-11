import React from 'react';
import Home from './about';
import Layout from '../../components/layout';

async function action({ fetch }) {
  return {
    chunks: ['about'],
    title: 'Shopkeep Storefront',
    component: (
      <Layout>
        <Home  />
      </Layout>
    ),
  };
}

export default action;
