import React from 'react';
import SpendingsDetailsTableRow from './SpendingsDetailsTableRow';

const SpendingsTable = ({ handleChangeSortBy, handleChangeFilter, handleDeleteSpending, spendings, filter, total }) => {
  return(
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th role="button" onClick={handleChangeSortBy} value="timestamp">Day</th>
          <th role="button" onClick={handleChangeSortBy} value="amount">Amount</th>
          <th role="button" onClick={handleChangeSortBy} value="category">Category {filter !== '' && <span className="label label-warning">Filter</span>}</th>
          <th role="button" onClick={handleChangeSortBy} value="description">Description</th>
        </tr>
      </thead>
      <tbody>
        {spendings.map((spending, index) => {
          return (
          <SpendingsDetailsTableRow key={spending.id} spending={spending} index={index} handleChangeFilter={handleChangeFilter} handleDeleteSpending={handleDeleteSpending} />
        )})}
        <tr className="info">
          <th colSpan="2">Total</th>
          <th>{total}</th>
          <th></th>
          <th></th>
        </tr>
      </tbody>
    </table>
  );
};

export default SpendingsTable;
