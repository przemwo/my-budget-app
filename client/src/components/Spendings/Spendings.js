import React from 'react';
import AddSpending from '../AddSpending';
import SpendingsByCategory from '../SpendingsByCategory';
import SpendingsDetails from '../SpendingsDetails';

const Spendings = () => {
  return(
    <div>
      <AddSpending />
      <SpendingsByCategory />
      <SpendingsDetails />
    </div>
  );
};

export default Spendings;
