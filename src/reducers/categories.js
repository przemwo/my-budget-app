import * as types from '../actions/actionsTypes';

const categories = (state = [], action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      return [...action.categories];
    case types.UPDATE_CATEGORY_SUCCESS:
      console.log(action.id, action.category);
      console.log(state);
      return state.map(category => {
        if(category.id === action.id) {
          return Object.assign({}, action.category);
        }
        return category;
      });
    default:
      return state;
  }
};
export default categories;
