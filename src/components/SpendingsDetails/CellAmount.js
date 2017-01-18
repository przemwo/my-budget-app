import React from 'react';

const CellAmount = ({ amount, isEdited, isEditedToggle, handleChangeAmount, handleOnBlur}) => {
  if(isEdited) {
    return(
      <td role="button" onBlur={handleOnBlur}>
        <input
          autoFocus
          type="text"
          value={amount}
          onChange={handleChangeAmount} />
      </td>
    );
  } else {
    return(
      <td role="button" onClick={isEditedToggle}>
        {amount}
      </td>
    );
  }
};

export default CellAmount;
