import React from 'react';
import dynamicSort from '../utils/dynamicSort';

const SpendingsTable = ({ spendings }) => {
  spendings.sort(dynamicSort('day'));
  const total = spendings.reduce((sum, spending) => {
    return sum + spending.amount;
  }, 0);
  return(
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Day</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {spendings.map((spending, index) =>
          <tr key={spending.id}>
            <th>{++index}</th>
            <td>{spending.day < 10 ? 0 : '' }{spending.day}</td>
            <td>{spending.amount}</td>
            <td>{spending.category}</td>
            <td>{spending.description}</td>
          </tr>
        )}
        <tr className="info">
          <th></th>
          <th></th>
          <th>{total}</th>
          <th></th>
          <th></th>
        </tr>
      </tbody>
    </table>
  );
};

export default SpendingsTable;
