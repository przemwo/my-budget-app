import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute, history, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App';

// import configureStore from '../store/configureStore';
// const store = configureStore();
// console.log(store.getState());

const fakeAuth = {
  auth: false
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuth: state.user.isAuthenticated
  };
};
const RouteCheckIfAuth = connect(mapStateToProps)(
  ({ component, isAuth, ...rest}) => {
    return(
      <Route {...rest} render={props => {
          if(isAuth) {
            return React.createElement(component, props);
          } else {
            return <div>Log in!</div>;
            }
          }}/>
      );
  }
);


const Root = () => {
  return(
    <div>
      <Router>
        <RouteCheckIfAuth path="/" component={App} />
      </Router>
    </div>
  );
};

export default Root;
