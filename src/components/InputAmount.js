import React from 'react';

const InputAmount = ({amount, handleChange, handleKeyUp}) => {
  return(
    <div className="form-group">
      <label className="sr-only" for="amountInput">Amount</label>
      <input type="text" className="form-control" id="amountInput" placeholder="Enter amount here..." value={amount} onChange={handleChange} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default InputAmount;
