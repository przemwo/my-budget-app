import React from 'react';
import { Router, Route, IndexRoute, history, browserHistory } from 'react-router';
import App from './App';
import Spendings from './Spendings';
import Budget from './Budget';
import Categories from './Categories';
import Login from './Login';

const test = (nextState, replaceState) => {
  replaceState({ nextPathname: nextState.location.pathname }, '/budget');
};

const Root = () => {
  return(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Spendings} onEnter={test}/>
        <Route path="budget" component={Budget} />
        <Route path="categories" component={Categories} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  );
};

export default Root;
