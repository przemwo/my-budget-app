import * as types from '../actions/actionsTypes';

const mainReducer = (state = [], action) => {
  switch (action.type) {
    case types.TEST_ACTION:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

export default mainReducer;
