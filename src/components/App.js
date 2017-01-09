import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.state = {
      spendings: [],
      selectedCategory: 'jedzenie',
      categories: [
        'mieszkanie',
        'jedzenie',
        'transport',
        'inne',
      ],
      year: year,
      month: month
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('http://localhost:3001/spendings').then((res) => {
      console.log(JSON.stringify(res.data, null, 2));
      this.setState({
        spendings: res.data
      });
    });
  }
  handleChange(event) {
    this.setState({
      selectedCategory: event.target.value
    });
  }
  render() {
    return(
      <div className="container">
        <h2>My Budget App</h2>
        <h4>{this.state.year}/{this.state.month}</h4>
        <div className="form-inline">
          <div className="form-group">
            <select className="form-control" value={this.state.selectedCategory} onChange={this.handleChange}>
              {this.state.categories.map((category, index) =>
                <option key={index} value={category}>{category}</option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label className="sr-only" for="amountInput">Amount</label>
            <input type="text" className="form-control" id="amountInput" placeholder="Enter amount here..." />
          </div>
          <div className="form-group">
            <label className="sr-only" for="descriptionInput">Description</label>
            <input type="text" className="form-control" id="descriptionInput" placeholder="Description..." />
          </div>
          <button className="btn btn-default">Add</button>
        </div>
        {this.state.spendings.map((spending, index) =>
          <div key={index}>
            <p>Category: {spending.category}: {spending.amount} - {spending.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
