import { createStore, applyMiddleware } from 'redux';
import main from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const configureStore = (initialState) => {
  return createStore(
    main,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant(), serviceMiddleware)
  );
};

export default configureStore;



const serviceMiddleware = ({ dispatch, getState }) => next => action => {
  console.log(action);
  // if (action.type == 'SOMETHING_SPECIAL') {
  //   myService.doSomething(getState());
  //   myService.doSomethingElse().then(result => dispatch({ type: 'SOMETHING_ELSE', result }))
  // }
  return next(action);
};
