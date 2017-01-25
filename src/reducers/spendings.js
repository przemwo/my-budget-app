import * as types from '../actions/actionsTypes';

const spendings = (state = [], action) => {
  switch (action.type) {
    case types.GET_SPENDINGS_SUCCESS:
      return [...action.spendings];
    case types.ADD_SPENDING_SUCCESS:
      return [...state, action.spending];
    case types.DELETE_SPENDING_SUCCESS:
      return state.filter(spending => {
        return spending.id !== action.id;
      });
    case types.UPDATE_SPENDING_AMOUNT_SUCCESS:
      return state.map(spending => {
        if(spending.id === action.id) {
          return Object.assign({}, spending, { amount: action.amount });
        }
        return spending;
      });
    case types.UPDATE_SPENDING_DAY_SUCCESS:
      return state.map(spending => {
        if(spending.id === action.id) {
          return Object.assign({}, spending, { day: action.day });
        }
        return spending;
      });
    case types.UPDATE_SPENDING_DESCRIPTION_SUCCESS:
      return state.map(spending => {
        if(spending.id === action.id) {
          return Object.assign({}, spending, { description: action.description });
        }
        return spending;
      });
    case types.UPDATE_SPENDING_CATEGORY_SUCCESS:
      return state.map(spending => {
        if(spending.id === action.id) {
          return Object.assign({}, spending, { category: action.category });
        }
        return spending;
      });
    default:
      return state;
  }
};

export default spendings;
