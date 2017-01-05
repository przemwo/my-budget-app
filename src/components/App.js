import React from 'react';

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
      <h1>Hello world!</h1>
    );
  }
}

export default App;
