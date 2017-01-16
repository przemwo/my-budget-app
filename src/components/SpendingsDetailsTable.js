import React from 'react';

const SpendingsTable = ({ handleChangeSortBy, handleChangeFilter, spendings, filter, total }) => {
  return(
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th role="button" onClick={handleChangeSortBy} value="day">Day</th>
          <th role="button" onClick={handleChangeSortBy} value="amount">Amount</th>
          <th role="button" onClick={handleChangeSortBy} value="category">Category {filter !== '' && <span className="label label-warning">Filter</span>}</th>
          <th role="button" onClick={handleChangeSortBy} value="description">Description</th>
        </tr>
      </thead>
      <tbody>
        {spendings.map((spending, index) =>
          <tr key={spending.id}>
            <th>{++index}</th>
            <td>{spending.day < 10 ? 0 : '' }{spending.day}</td>
            <td>{spending.amount}</td>
            <td role="button" onClick={handleChangeFilter}>{spending.category}</td>
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
