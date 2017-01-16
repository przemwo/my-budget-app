import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';
import ProjectApi from '../api/ProjectApi';
import AddSpendingForm from './AddSpendingForm';
import SpendingsDetails from './SpendingsDetails';
import SpendingsByCategory from './SpendingsByCategory';

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
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount() {
    ProjectApi.getCategories().then(data => {
      this.setState((prevState, props) => {
        return { categories: data };
      });
    });
    ProjectApi.getSpendings().then(data => {
      // data.sort(this.compare);
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
  handleChangeDescription(e) {
    e.preventDefault();
    const description = e.target.value;
    this.setState((prevState, props) => {
      return { description };
    });
  }
  handleChangeAmount(e) {
    e.preventDefault();
    const amount = parseInt(e.target.value, 10) || '';
    this.setState((prevState, props) => {
      return { amount, canAddAmount: amount !== '' };
    });
  }
  handleKeyUp(e) {
    e.preventDefault();
    const enterKeyCode = 13;
    if(!this.state.canAddAmount || e.keyCode !== enterKeyCode) {
      return;
    }
    this.addSpending();
  }
  handleAddSpendingClick(e) {
    e.preventDefault();
    this.addSpending();
  }
  addSpending() {
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
          handleKeyUp={this.handleKeyUp}
        />

        <SpendingsByCategory spendings={this.state.spendings} />

        <SpendingsDetails spendings={this.state.spendings} />

      </div>
    );
  }
}

export default App;
