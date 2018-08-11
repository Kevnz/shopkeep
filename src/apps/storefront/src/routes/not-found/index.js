import React from 'react';
import Layout from '../../components/layout';
import NotFound from './not-found';

const title = 'Page Not Found';

function action() {
  return {
    chunks: ['not-found'],
    title,
    component: (
      <Layout>
        <NotFound title={title} />
      </Layout>
    ),
    status: 404,
  };
}

export default action;
