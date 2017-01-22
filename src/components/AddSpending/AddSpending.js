import React from 'react';
import { connect } from 'react-redux';
import { addSpending, getCategories, getFavouriteCategories } from '../../actions/actions';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css';
import FavouriteCategories from './FavouriteCategories';
import SelectCategory from './SelectCategory';
import Input from '../form/Input';
import Button from '../form/Button';
import Date from './Date';

toastr.options = {
  "newestOnTop": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "timeOut": "2000"
}

class AddSpendingIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'jedzenie',
      amount: '',
      description: '',
      canAddAmount: false
    };
    this.changeCategory = this.changeCategory.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.onHitEnterKey = this.onHitEnterKey.bind(this);
    this.onClickaddSpendingButton = this.onClickaddSpendingButton.bind(this);
    this.addSpending = this.addSpending.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCategories());
    dispatch(getFavouriteCategories());
  }
  changeCategory(e) {
    e.preventDefault();
    const category = e.target.value;
    this.setState((prevState, props) => {
      return {
        selectedCategory: category
      };
    });
  }
  changeAmount(e) {
    e.preventDefault();
    const amount = parseInt(e.target.value, 10) || '';
    this.setState((prevState, props) => {
      return {
        amount,
        canAddAmount: amount !== ''
      };
    });
  }
  changeDescription(e) {
    e.preventDefault();
    const description = e.target.value;
    this.setState((prevState, props) => {
      return {
        description
      };
    });
  }
  onHitEnterKey(e) {
    e.preventDefault();
    const enterKeyCode = 13;
    if(!this.state.canAddAmount || e.keyCode !== enterKeyCode) {
      return;
    }
    this.addSpending();
  }
  onClickaddSpendingButton(e) {
    e.preventDefault();
    this.addSpending();
  }
  addSpending() {
    const { dispatch } = this.props;
    dispatch(addSpending({
      amount: this.state.amount,
      category: this.state.selectedCategory,
      description: this.state.description
    })).then(() => {
      toastr.success('Spending has been added');
      this.setState((prevState, props) => {
        return {
          amount: '',
          description: '',
          canAddAmount: false
        };
      });
    });
  }
  render() {
    const categories = this.props.categories;
    const favouritecategories = this.props.favouritecategories;
    return(
      <div>

      <Date />

      <div className="form-inline">

        <FavouriteCategories
          favouritecategories={favouritecategories}
          handleOnClick={this.changeCategory}
        />

          <SelectCategory
            categories={categories}
            selectedCategory={this.state.selectedCategory}
            handleOnChange={this.changeCategory}
          />

          <Input
            label="Amount"
            placeholder="Enter amount here..."
            value={this.state.amount}
            onChange={this.changeAmount}
            onKeyUp={this.onHitEnterKey}
          />

          <Input
            label="Description"
            placeholder="Enter description here..."
            value={this.state.description}
            onChange={this.changeDescription}
            onKeyUp={this.onHitEnterKey}
          />

          <Button
            disabled={!this.state.canAddAmount}
            onClick={this.onClickaddSpendingButton}
            type="btn-primary"
          >
            Add
          </Button>
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    favouritecategories: state.favouritecategories,
    dates: state.dates
  };
};
const AddSpending = connect(mapStateToProps)(AddSpendingIndex);
export default AddSpending;
