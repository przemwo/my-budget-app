import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, history, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App';

const Root = () => {
  return(
    <div>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </div>
  );
};
export default Root;
