import React from 'react';
import { Link } from 'react-router';

const App = (props) => {
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
      {props.children}
    </div>
  );
}
export default App;
