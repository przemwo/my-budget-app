import * as types from '../actions/actionsTypes';

const categories = (state = [], action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      return [...action.categories];
    case types.UPDATE_CATEGORY_SUCCESS:
      return state.map(category => {
        if(category.id === action.id) {
          return Object.assign({}, action.category);
        }
        return category;
      });
    case types.ADD_NEW_CATEGORY_SUCCESS:
      return [...state, action.category];
    case types.DELETE_CATEGORY_SUCCESS:
      return state.filter(category => category.id !== action.id);
    default:
      return state;
  }
};
export default categories;
