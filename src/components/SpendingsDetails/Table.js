import React from 'react';
import Row from './Row';

const Table = ({ handleChangeSortBy, handleDeleteSpending, handleChangeAmount, spendings, total }) => {
  return(
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th role="button" onClick={handleChangeSortBy} value="timestamp">Day</th>
          <th role="button" onClick={handleChangeSortBy} value="amount">Amount</th>
          <th role="button" onClick={handleChangeSortBy} value="category">Category</th>
          <th role="button" onClick={handleChangeSortBy} value="description">Description</th>
        </tr>
      </thead>
      <tbody>
        {spendings.map((spending, index) => {
          return (
          <Row key={spending.id} spending={spending} index={index} handleDeleteSpending={handleDeleteSpending} handleChangeAmount={handleChangeAmount} />
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

export default Table;
