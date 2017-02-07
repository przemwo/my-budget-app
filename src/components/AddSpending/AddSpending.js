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

const changeCategory = (categoryId) => (state, props) => {
  return {
    selectedCategoryId: categoryId
  };
};
const changeAmount = (amount) => (state, props) => {
  return {
    amount,
    canAddAmount: amount !== ''
  };
};
const changeDescription = (description) => (state, props) => {
  return {
    description
  };
};
const resetToDefault = (state, props) => {
  return {
    amount: '',
    description: '',
    canAddAmount: false
  };
};

class AddSpending extends React.Component {
  state = {
    selectedCategoryId: 1,
    amount: '',
    description: '',
    canAddAmount: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(getCategories());
    // dispatch(getFavouriteCategories());
  }
  changeCategory = (e) => {
    e.preventDefault();
    const categoryId = e.target.value;
    this.setState(changeCategory(categoryId));
  }
  changeAmount = (e) => {
    e.preventDefault();
    const amount = parseInt(e.target.value, 10) || '';
    this.setState(changeAmount(amount));
  }
  changeDescription = (e) => {
    e.preventDefault();
    const description = e.target.value;
    this.setState(changeDescription(description));
  }
  onHitEnterKey = (e) => {
    e.preventDefault();
    const enterKeyCode = 13;
    if(!this.state.canAddAmount || e.keyCode !== enterKeyCode) {
      return;
    }
    this.addSpending();
  }
  onClickaddSpendingButton = (e) => {
    e.preventDefault();
    this.addSpending();
  }
  addSpending = () => {
    const { dispatch } = this.props;
    const [category] = this.props.categories.filter(category => category.id === this.state.selectedCategoryId);
    dispatch(addSpending({
      amount: this.state.amount,
      category: category.name,
      description: this.state.description
    })).then(() => {
      toastr.success('Spending has been added');
      this.setState(resetToDefault);
    });
  }
  render() {
    const categories = [...this.props.categories].filter(category => category.status === 'active');
    const favouritecategories = categories.filter(category => category.favourite === true);
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
            selectedCategoryId={this.state.selectedCategoryId}
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
AddSpending.propTypes = {
  categories: React.PropTypes.array,
  favouritecategories: React.PropTypes.array
};
const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    favouritecategories: state.favouritecategories
  };
};
export default connect(mapStateToProps)(AddSpending);
