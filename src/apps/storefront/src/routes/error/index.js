import React from 'react';
import ErrorPage from './error-page';

function action() {
  return {
    title: 'Demo Error',
    component: <ErrorPage />,
  };
}

export default action;
