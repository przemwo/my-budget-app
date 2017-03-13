import * as types from '../actions/actionsTypes';

const incomings = (state = [], action) => {
  switch (action.type) {
    case types.GET_INCOMINGS_SUCCESS:
      return [...action.incomings];
    default:
      return state;
  }
};
export default incomings;
