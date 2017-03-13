import * as types from './actionsTypes';
import projectApi from '../api/projectApi';

export const getSpendingsSuccess = (spendings) => {
  return {
    type: types.GET_SPENDINGS_SUCCESS,
    spendings
  };
};
export const getSpendings = () => {
  return (dispatch, getState) => {
    return projectApi.getSpendings().then(res => {
      dispatch(getSpendingsSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const addSpendingSuccess = (spending) => {
  return {
    type: types.ADD_SPENDING_SUCCESS,
    spending
  };
};
export const addSpending = (spending) => {
  return (dispatch, getState) => {
    const state = getState();
    const timestamp = new Date(state.dates.year, state.dates.month, state.dates.day);
    spending.timestamp = timestamp.getTime();
    spending.year = state.dates.year;
    spending.month = state.dates.month;
    spending.day = state.dates.day;
    spending.status = "active";
    return projectApi.addSpending(spending).then(res => {
      dispatch(addSpendingSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const deleteSpendingSuccess = (id) => {
  return {
    type: types.DELETE_SPENDING_SUCCESS,
    id
  };
};
export const deleteSpending = (id, spending) => {
  return (dispatch, getState) => {
    return projectApi.deleteSpending(id, spending).then(res => {
      dispatch(deleteSpendingSuccess(id));
    }).catch(error => {
      throw(error);
    });
  };
};

export const updateSpendingSuccess = (id, spending) => {
  return {
    type: types.UPDATE_SPENDING_SUCCESS,
    id,
    spending
  };
};
export const updateSpending = (id, spending) => {
  return (dispatch, getState) => {
    return projectApi.updateSpending(id, spending).then(res => {
      dispatch(updateSpendingSuccess(id, spending));
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
  return (dispatch, getState) => {
    return projectApi.getCategories().then(res => {
      dispatch(getCategoriesSuccess(res));
      return res;
    }).catch(error => {
      throw(error);
    });
  };
};

export const updateDate = (date) => {
  return {
    type: types.UPDATE_DATE,
    date
  };
};

export const getIncomingsSuccess = (incomings)  => {
  return {
    type: types.GET_INCOMINGS_SUCCESS,
    incomings
  };
};
export const getIncomings = () => {
  return (dispatch, getState) => {
    return projectApi.getIncomings().then(res => {
      dispatch(getIncomingsSuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const updateCategorySuccess = (id, category)  => {
  return {
    type: types.UPDATE_CATEGORY_SUCCESS,
    id,
    category
  };
};
export const updateCategory = (id, category) => {
  return (dispatch, getState) => {
    return projectApi.updateCategory(id, category).then(res => {
      dispatch(updateCategorySuccess(id, category));
    }).catch(error => {
      throw(error);
    });
  };
};

export const addCategorySuccess = (category)  => {
  return {
    type: types.ADD_NEW_CATEGORY_SUCCESS,
    category
  };
};
export const addCategory = (category) => {
  return (dispatch, getState) => {
    return projectApi.addCategory(category).then(res => {
      dispatch(addCategorySuccess(res));
    }).catch(error => {
      throw(error);
    });
  };
};

export const deleteCategorySuccess = (id)  => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    id
  };
};
export const deleteCategory = (id) => {
  return (dispatch, getState) => {
    return projectApi.deleteCategory(id).then(res => {
      dispatch(deleteCategorySuccess(id));
    }).catch(error => {
      throw(error);
    });
  };
};
