import * as types from '../actions/actionsTypes';
import { combineReducers } from 'redux';
import spendings from './spendings';
import categories from './categories';
import favouritecategories from './favouritecategories';

const mainReducer = combineReducers({
  spendings,
  categories,
  favouritecategories
});

export default mainReducer;
