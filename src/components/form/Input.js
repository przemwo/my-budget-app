import React from 'react';

const Input = ({
  type = 'text',
  className = 'form-control',
  label = '',
  placeholder = '',
  value = null,
  onChange = () => {},
  onKeyUp = () => {},
  onBlur = () => {},
  onInput = () => {}
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
        type={type}
        className={className}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onInput={onInput}
      />
    </div>
  );
};

export default Input;