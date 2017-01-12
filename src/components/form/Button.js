import React from 'react';

const Button = ({type = 'btn-default', disabled, handleClick, children}) => {
  return(
    <button
      className={`btn ${type}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>

  );
};

export default Button;
