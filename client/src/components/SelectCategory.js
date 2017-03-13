import React from 'react';

const SelectCategory = ({selectedCategory, handleChange, categories}) => {
  return(
    <div className="form-group">
      <select className="form-control" value={selectedCategory} onChange={handleChange}>
        {categories.map((category, index) =>
          <option key={index} value={category}>{category}</option>
        )}
      </select>
    </div>
  );
};

export default SelectCategory;
