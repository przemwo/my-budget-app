import React from 'react';
import { connect } from 'react-redux';
import { getSpendings, addSpending, deleteSpending, updateSpendingAmount, getCategories, getFavouriteCategories } from '../actions/actions';
import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';
import projectApi from '../api/projectApi';
import AddSpendingForm from './AddSpendingForm';
import SpendingsDetails from './SpendingsDetails/SpendingsDetails';
import SpendingsByCategory from './SpendingsByCategory';

class Temp extends React.Component {
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
      selectedCategory: 'jedzenie',
      amount: '',
      description: '',
      year: year,
      month: month,
      day: day,
      canAddAmount: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleAddSpendingClick = this.handleAddSpendingClick.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleDeleteSpending = this.handleDeleteSpending.bind(this);
    this.handleChangeEditableAmount = this.handleChangeEditableAmount.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
    this.props.getFavouriteCategories();
    this.props.getSpendings();
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
    const timestamp = new Date();
    this.props.addSpending({
      timestamp: timestamp.getTime(),
      year: timestamp.getFullYear(),
      month: timestamp.getMonth() + 1,
      day: timestamp.getDate(),
      amount: this.state.amount,
      category: this.state.selectedCategory,
      description: this.state.description,
      status: "active"
    });
    toastr.success('Spending has been added');
    this.setState((prevState, props) => {
      return {
        amount: '',
        description: '',
        canAddAmount: false
      };
    });
  }
  handleDeleteSpending(e) {
    const spendingToDelteId = e.target.value;
    this.props.deleteSpending(spendingToDelteId);
    toastr.success('Spending has been deleted');
  }
  handleChangeEditableAmount(e, id) {
    const newAmount = parseInt(e.target.value, 10) || '';
    // const spendings = this.state.spendings.map(spending => {
    //   if(spending.id === id) {
    //     spending.amount = newAmount;
    //   }
    //   return spending;
    // });
    // this.setState((prevState, props) => {
    //   return { spendings: [...spendings] };
    // });
    // return projectApi.updateAmount(id, newAmount);
    this.props.updateSpendingAmount(id, newAmount);
  }
  render() {
    const favouritecategories = this.props.favouritecategories;
    const categories = this.props.categories;
    const spendings = this.props.spendings;
    return(
      <div className="container">
        <h2>My Budget App</h2>
        <h4>{this.state.year}/{this.state.month}</h4>

        <AddSpendingForm
          selectedCategory={this.state.selectedCategory}
          favouritecategories={favouritecategories}
          handleChangeCategory={this.handleChange}
          categories={categories}
          amount={this.state.amount}
          handleChangeAmount={this.handleChangeAmount}
          description={this.state.description}
          handleChangeDescription={this.handleChangeDescription}
          canAddAmount={this.state.canAddAmount}
          handleAddSpendingClick={this.handleAddSpendingClick}
          handleKeyUp={this.handleKeyUp}
        />

        <SpendingsByCategory spendings={spendings} />

        <SpendingsDetails spendings={spendings} handleDeleteSpending={this.handleDeleteSpending} handleChangeAmount={this.handleChangeEditableAmount} />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spendings: state.spendings,
    categories: state.categories,
    favouritecategories: state.favouritecategories
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSpendings: () => {
      dispatch(getSpendings())
    },
    addSpending: (spending) => {
      dispatch(addSpending(spending))
    },
    deleteSpending: (id) => {
      dispatch(deleteSpending(id))
    },
    updateSpendingAmount: (id, amount) => {
      dispatch(updateSpendingAmount(id, amount))
    },
    getCategories: () => {
      dispatch(getCategories())
    },
    getFavouriteCategories: () => {
      dispatch(getFavouriteCategories())
    }
  };
};
const App = connect(mapStateToProps, mapDispatchToProps)(Temp);
export default App;
