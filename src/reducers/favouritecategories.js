import * as types from '../actions/actionsTypes';

const favouritecategories = (state = [], action) => {
  switch (action.type) {
    case types.GET_FAVOURITE_CATEGORIES_SUCCESS:
      return [...action.favouritecategories];
    default:
      return state;
  }
};

export default favouritecategories;
