import * as types from './actionsTypes';
import projectApi from '../api/projectApi';

export const getSpendingsSuccess = (spendings) => {
  return {
    type: types.GET_SPENDINGS_SUCCESS,
    spendings
  };
};
export const getSpendings = () => {
  return (dispatch) => {
    return projectApi.getSpendings().then(res => {
      dispatch(getSpendingsSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const getCategoriesSuccess = (categories) => {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    categories
  };
};
export const getCategories = () => {
  return (dispatch) => {
    return projectApi.getCategories().then(res => {
      dispatch(getCategoriesSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const getFavouriteCategoriesSuccess = (favouritecategories) => {
  return {
    type: types.GET_FAVOURITE_CATEGORIES_SUCCESS,
    favouritecategories
  };
};
export const getFavouriteCategories = () => {
  return (dispatch) => {
    return projectApi.getFavouriteCategories().then(res => {
      dispatch(getFavouriteCategoriesSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};
