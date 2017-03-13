import { createStore, applyMiddleware } from 'redux';
import main from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const configureStore = (initialState) => {
  return createStore(
    main,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
};

export default configureStore;
