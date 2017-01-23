import React from 'react';

const SelectCategory = ({
  selectedCategory,
  handleOnChange,
  categories
}) => {
  return(
    <div className="form-group">
      <select className="form-control" value={selectedCategory} onChange={handleOnChange}>
        {categories.map((category, index) =>
          <option key={index} value={category}>{category}</option>
        )}
      </select>
    </div>
  );
};

export default SelectCategory;
