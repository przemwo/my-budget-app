import React from 'react';

const Input = ({
  type = 'text',
  className = 'form-control',
  style = {},
  label = '',
  placeholder = '',
  value = null,
  onChange = () => {},
  onKeyUp = () => {},
  onBlur = () => {},
  onInput = () => {},
  autoFocus = false
}) => {
  const id = `input${label}`;
  const inputProps = autoFocus ? { autoFocus } : {};
  return(
    <div className="form-group" style={style}>
      <label
        className="sr-only"
        for={id}
      >
        {label}
      </label>
      <input
        {...inputProps}
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
