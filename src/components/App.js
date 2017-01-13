import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';
import ProjectApi from '../api/ProjectApi';
import dynamicSort from '../utils/dynamicSort';
import AddSpendingForm from './AddSpendingForm';

class App extends React.Component {
  constructor(props) {
    super(props);

    toastr.options = {
      "newestOnTop": true,
      "positionClass": "toast-top-center",
      "preventDuplicates": true,
      "timeOut": "2000"
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    this.state = {
      spendings: [],
      categories: [],
      selectedCategory: 'jedzenie',
      amount: '',
      description: '',
      year: year,
      month: month,
      day: day,
      canAddAmount: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleAddSpendingClick = this.handleAddSpendingClick.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }
  componentDidMount() {
    ProjectApi.getCategories().then(data => {
      this.setState((prevState, props) => {
        return { categories: data };
      });
    });
    ProjectApi.getSpendings().then(data => {
      data.sort()
      // data.sort(this.compare);
      data.sort(dynamicSort("day"));
      this.setState((prevState, props) => {
        return { spendings: data };
      });
    });
  }
  handleChange(e) {
    this.setState({
      selectedCategory: e.target.value
    });
  }
  handleChangeAmount(e) {
    e.preventDefault();
    const amount = parseInt(e.target.value, 10) || '';
    this.setState((prevState, props) => {
      return { amount, canAddAmount: amount !== '' };
    });
  }
  handleChangeDescription(e) {
    e.preventDefault();
    const description = e.target.value;
    this.setState((prevState, props) => {
      return { description };
    });
  }
  handleAddSpendingClick(e) {
    e.preventDefault();
    return ProjectApi.addSpending({
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      amount: this.state.amount,
      category: this.state.selectedCategory,
      description: this.state.description
    }).then(res => {
      toastr.success('Spending has been added');
      this.setState((prevState, props) => {
        return {
          spendings: [...prevState.spendings, res],
          amount: '',
          description: '',
          canAddAmount: false
        };
      });
    });
  }
  render() {
    return(
      <div className="container">
        <h2>My Budget App</h2>
        <h4>{this.state.year}/{this.state.month}</h4>

        <AddSpendingForm
          selectedCategory={this.state.selectedCategory}
          handleChangeCategory={this.handleChange}
          categories={this.state.categories}
          amount={this.state.amount}
          handleChangeAmount={this.handleChangeAmount}
          description={this.state.description}
          handleChangeDescription={this.handleChangeDescription}
          canAddAmount={this.state.canAddAmount}
          handleAddSpendingClick={this.handleAddSpendingClick}
        />

      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Day</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.state.spendings.map(spending =>
            <tr key={spending.id}>
              <td>{spending.day}</td>
              <td>{spending.amount}</td>
              <td>{spending.category}</td>
              <td>{spending.description}</td>
            </tr>
          )}
        </tbody>
      </table>

      </div>
    );
  }
}

export default App;
