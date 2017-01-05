import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './app';


const Root = () => {
  return(
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </MuiThemeProvider>
  );
};

export default Root;
