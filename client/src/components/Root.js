import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Spendings from './Spendings';
import Budget from './Budget';
import Categories from './Categories';
import Login from './Login';

const Root = () => {
  return(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Spendings}/>
        <Route path="budget" component={Budget} />
        <Route path="categories" component={Categories} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  );
};

export default Root;
