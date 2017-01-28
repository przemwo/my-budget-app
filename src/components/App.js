import React from 'react';
import { Link } from 'react-router';

const App = (props) => {
  return(
    <div className="container">
      <h2>My Spendings App</h2>
      <Link to="/">Spendings</Link>
      <Link to="/budget">Budget</Link>
      {props.children}
    </div>
  );
}
export default App;
