import React from 'react';
import AddSpending from './AddSpending/AddSpending';
import SpendingsDetails from './SpendingsDetails/SpendingsDetails';
import SpendingsByCategory from './SpendingsByCategory';

const App = () => {
  return(
    <div className="container">
      <h2>My Budget App</h2>
      <AddSpending />
      <SpendingsByCategory />
      <SpendingsDetails />
    </div>
  );
}
export default App;
