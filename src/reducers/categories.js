import * as types from '../actions/actionsTypes';

const categories = (state = [], action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      return [...action.categories];
    default:
      return state;
  }
};

export default categories;
