import React from 'react';
import AddSpending from './AddSpending/AddSpending';
import SpendingsByCategory from './SpendingsByCategory';
import Table from './SpendingsDetails/Table';

const App = () => {
  return(
    <div className="container">
      <h2>My Spendings App</h2>
      <AddSpending />
      <SpendingsByCategory />
      <Table />
    </div>
  );
}
export default App;
