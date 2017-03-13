import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Root from './components/Root';
import { getCategories } from './actions/actions';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';


const store = configureStore();
store.dispatch(getCategories());

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
);
