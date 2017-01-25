import React from 'react';

const Select = ({
  value,
  options,
  onChange = () => {},
  onBlur = () => {}
}) => {
  return(
    <div className="form-group">
      <select
        className="form-control"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        >
        {options.map((option, index) =>
          <option
            key={index}
            value={option}
          >
            {option}
          </option>
        )}
      </select>
    </div>
  );
};

export default Select;
