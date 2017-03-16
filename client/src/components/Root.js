import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, history, browserHistory } from 'react-router-dom';
import App from './App';

const Root = () => {
  return(
    <Router>
      <Route path="/" component={App} />
    </Router>
  );
};

export default Root;
