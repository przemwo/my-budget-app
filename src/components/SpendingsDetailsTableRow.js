import React from 'react';

const SpendingsDetailsTableRow = ({ spending, index, handleChangeFilter, handleDeleteSpending }) => {
  let day = new Date(spending.timestamp);
  day = day.getDate();
  return(
    <tr>
      <td>{++index}</td>
      <td>{day < 10 ? 0 : '' }{day}</td>
      <td>{spending.amount}</td>
      <td role="button" onClick={handleChangeFilter}>{spending.category}</td>
      <td>
        {spending.description}
        <span className="glyphicon glyphicon-trash pull-right" aria-hidden="true" onClick={handleDeleteSpending} value={spending.id}></span>
      </td>
    </tr>
  );
};

export default SpendingsDetailsTableRow;
