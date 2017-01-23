import React from 'react';
import { connect } from 'react-redux';
import { deleteSpending, updateSpendingAmount } from '../../actions/actions';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css';
import dynamicSort from '../../utils/dynamicSort';
import Table from './Table';

class SpendingsDetailsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'timestamp'
    };
    this.deleteSpending = this.deleteSpending.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
  }
  deleteSpending(e) {
    const spendingToDelteId = e.target.value;
    const { dispatch } = this.props;
    dispatch(deleteSpending(spendingToDelteId)).then(() => {
      toastr.success('Spending has been deleted');
    });
  }
  changeAmount(e, id) {
    const newAmount = parseInt(e.target.value, 10) || '';
    const { dispatch } = this.props;
    dispatch(updateSpendingAmount(id, newAmount));
  }
  handleChangeSortBy(e) {
    e.preventDefault();
    const sortBy = e.target.value;
    this.setState((prevState, props) => {
      return {
        sortBy
      };
    });
  }
  render() {
    let spendings = this.props.spendings;
    spendings = spendings.filter(spending => spending.status === 'active');
    spendings.sort(dynamicSort(this.state.sortBy));
    const total = spendings.reduce((sum, spending) => {
      return sum + spending.amount;
    }, 0);
    return(
      <Table
       spendings={spendings}
       handleDeleteSpending={this.deleteSpending}
       handleChangeSortBy={this.handleChangeSortBy}
       handleChangeAmount={this.changeAmount}
       total={total}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spendings: state.spendings
  };
};
const SpendingsDetails = connect(mapStateToProps)(SpendingsDetailsIndex);
export default SpendingsDetails;
