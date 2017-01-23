import React from 'react';

const Input = ({
  label = '',
  placeholder = '',
  value = null,
  onChange = () => {},
  onKeyUp = () => {}
}) => {
  const id = `input${label}`;
  return(
    <div className="form-group">
      <label
        className="sr-only"
        for={id}
      >
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default Input;
