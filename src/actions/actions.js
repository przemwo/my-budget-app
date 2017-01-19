import * as types from './actionsTypes';

export const testAcion = () => {
  return {
    type: types.TEST_ACTION,
    payload: 'some text'
  };
};
