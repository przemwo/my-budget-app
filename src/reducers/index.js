import * as types from '../actions/actionsTypes';

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_SPENDINGS:
      return Object.assign({}, state, { spendings: action.spendings });
    case types.GET_CATEGORIES:
      return Object.assign({}, state, { categories: action.categories });
    case types.GET_FAVOURITE_CATEGORIES:
      return Object.assign({}, state, { favouritecategories: action.favouritecategories });
    default:
      return state;
  }
};

export default mainReducer;
