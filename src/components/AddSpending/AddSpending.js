import React from 'react';
import AddSpendingForm from './AddSpendingForm';

const AddSpending = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  return(
    <div>
      <h4>{year}/{month}</h4>
      <AddSpendingForm />
    </div>
  );
};

export default AddSpending;
