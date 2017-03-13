import React from 'react';

const InputDescription = ({description, handleChange, handleKeyUp}) => {
  return(
    <div className="form-group">
      <label className="sr-only" for="descriptionInput">Description</label>
      <input type="text" className="form-control" id="descriptionInput" placeholder="Description..." value={description} onChange={handleChange} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default InputDescription;
