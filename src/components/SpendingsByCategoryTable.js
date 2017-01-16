import React from 'react';

const SpendingsByCategoryTable = ({ spendings }) => {
  const total = spendings.reduce((cum, spending) => {
    return cum += spending.amount;
  }, 0);
  return(
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th role="button" onClick={() => {}} value="amount">Amount</th>
          <th role="button" onClick={() => {}} value="category">Category</th>
        </tr>
      </thead>
      <tbody>
        {spendings.map((spending, index) =>
          <tr key={index}>
            <th>{++index}</th>
            <td>{spending.amount}</td>
            <td>{spending.category}</td>
          </tr>
        )}
        <tr className="info">
          <th></th>
          <th>{total}</th>
          <th></th>
        </tr>
      </tbody>
    </table>
  );
};

export default SpendingsByCategoryTable;
