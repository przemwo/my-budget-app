import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './app';

const Root = () => {
  return(
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  );
};

export default Root;
