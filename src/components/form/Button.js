import React from 'react';

const Button = ({
  type = 'btn-default',
  disabled,
  onClick,
  children
}) => {
  return(
    <button
      className={`btn ${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>

  );
};

export default Button;
