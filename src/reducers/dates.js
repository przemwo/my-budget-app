import * as types from '../actions/actionsTypes';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

const dates = (
  state = {
    year,
    month,
    day
  },
  action
) => {
  switch (action.type) {
    case types.UPDATE_DATE:
      return action.date;
    default:
      return state;
  }
};

export default dates;
