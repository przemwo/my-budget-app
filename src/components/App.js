import React from 'react';
import { Link } from 'react-router';

const App = (props) => {
  return(
    <div className="container">
      <h1>My Spendings App</h1>
      <Link to="/">Spendings</Link>
      <Link to="/budget">Budget</Link>
      <Link to="/categories">Manage Categories</Link>
      <Link to="/foo">Foo</Link>
      {props.children}
    </div>
  );
}
export default App;
