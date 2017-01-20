import * as types from '../actions/actionsTypes';

const spendings = (state = [], action) => {
  switch (action.type) {
    case types.GET_SPENDINGS_SUCCESS:
      return [...action.spendings];
    default:
      return state;
  }
}

export default spendings;
