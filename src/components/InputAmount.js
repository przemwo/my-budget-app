import React from 'react';

const InputAmount = ({amount, handleChange}) => {
  return(
    <div className="form-group">
      <label className="sr-only" for="amountInput">Amount</label>
      <input type="text" className="form-control" id="amountInput" placeholder="Enter amount here..." value={amount} onChange={handleChange} />
    </div>
  );
};

export default InputAmount;
