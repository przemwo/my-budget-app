import * as types from '../actions/actionsTypes';
import { combineReducers } from 'redux';
import spendings from './spendings';
import categories from './categories';
import favouritecategories from './favouritecategories';
import dates from './dates';
import incomings from './incomings';

const mainReducer = combineReducers({
  spendings,
  categories,
  favouritecategories,
  dates,
  incomings
});

export default mainReducer;
