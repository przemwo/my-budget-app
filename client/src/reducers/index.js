import * as types from '../actions/actionsTypes';
import { combineReducers } from 'redux';
import spendings from './spendings';
import categories from './categories';
import favouritecategories from './favouritecategories';
import dates from './dates';
import incomings from './incomings';
import user from './user';

const mainReducer = combineReducers({
  spendings,
  categories,
  favouritecategories,
  dates,
  incomings,
  user
});

export default mainReducer;
