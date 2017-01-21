import React from 'react';

const Button = ({
  type = 'btn-default',
  disabled,
  handleOnClick,
  children
}) => {
  return(
    <button
      className={`btn ${type}`}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
    </button>

  );
};

export default Button;
