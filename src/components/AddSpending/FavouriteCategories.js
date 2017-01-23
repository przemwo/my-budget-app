import React from 'react';

const FavouriteCategories = ({
  favouritecategories,
  handleOnClick
}) => {
  return(
    <div>
      {favouritecategories.map((favouritecategory, index) =>
        <button key={index} value={favouritecategory} onClick={handleOnClick} className="btn btn-primary btn-xs">
          {favouritecategory}
        </button>
      )}
    </div>
  );
};

export default FavouriteCategories;
