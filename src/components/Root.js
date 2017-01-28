import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Spendings from './Spendings';
import Budget from './Budget';


const Root = () => {
  return(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Spendings}/>
        <Route path="budget" component={Budget} />
      </Route>
    </Router>
  );
};

export default Root;
