import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [
        'Mieszkanie',
        'Jedzenie',
        'Transport'
      ]
    };
  }
  render() {
    return(
      <div>
        <h1>Hello world!</h1>
        <RaisedButton label="Default" />
      </div>
    );
  }
}

export default App;
