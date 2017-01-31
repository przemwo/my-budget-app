import React from 'react';

const FavouriteCategories = ({
  favouritecategories,
  handleOnClick
}) => {
  return(
    <div>
      {favouritecategories.map((favouritecategory, index) =>
        <button key={index} value={favouritecategory.id} onClick={handleOnClick} className="btn btn-primary btn-xs">
          {favouritecategory.name}
        </button>
      )}
    </div>
  );
};

export default FavouriteCategories;
