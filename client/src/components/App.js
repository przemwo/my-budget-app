import React from 'react';
import { Route, Link } from 'react-router-dom';
import Spendings from './Spendings';
import Budget from './Budget';
import Categories from './Categories';
import Login from './Login';

const App = ({ match }) => {
  return(
    <div className="container">
      <a href="/login">Login</a>
      {' '}
      <a href="/logout">Logout</a>
      <h1>My Spendings App</h1>
      <Link to="/">Spendings</Link>
      {' '}
      <Link to="/budget">Budget</Link>
      {' '}
      <Link to="/categories">Manage Categories</Link>
      
      <Route exact path="/" component={Spendings} />
      <Route path="/budget" component={Budget} />
      <Route path="/categories" component={Categories} />
      <Route path="/login" component={Login} />
    </div>
  );
}
export default App;
