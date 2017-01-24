import React from 'react';
import { connect } from 'react-redux';
import { updateSpendingAmount, updateSpendingDescription, updateSpendingDay } from '../../actions/actions';
import Row from './Row';
import dynamicSort from '../../utils/dynamicSort';

class TableIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedRowId: ''
    };
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }
  toggleIsEditing(id) {
    this.setState((prevState, props) => {
      return {
        editedRowId: id
      };
    });
  }
  updateAmount(id, amount) {
    const { dispatch } = this.props;
    dispatch(updateSpendingAmount(id, amount));
  }
  updateDay(id, day) {
    const { dispatch } = this.props;
    dispatch(updateSpendingDay(id, day));
  }
  updateDescription(id, description) {
    const { dispatch } = this.props;
    dispatch(updateSpendingDescription(id, description));
  }
  render() {
    const spendings = this.props.spendings;
    const total = spendings.reduce((sum, spending) => {
      return sum += parseInt(spending.amount);
    }, 0);
    return(
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th role="button" onClick={() => {}} value="timestamp">Day</th>
            <th role="button" onClick={() => {}} value="amount">Amount</th>
            <th role="button" onClick={() => {}} value="category">Category</th>
            <th role="button" onClick={() => {}} value="description">Description</th>
          </tr>
        </thead>
        <tbody>
          {spendings.map((spending, index) =>
            <Row
              key={spending.id}
              spending={spending}
              index={index}
              isEditing={this.state.editedRowId === spending.id}
              toggleIsEditing={this.toggleIsEditing}
              updateAmount={this.updateAmount}
              updateDay={this.updateDay}
              updateDescription={this.updateDescription}
            />
          )}
          <tr className="info">
            <th colSpan="2">Total</th>
            <th>{total}</th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    );
  }
}
TableIndex.propTypes = {
  spendings: React.PropTypes.array
};
const mapStateToProps = (state) => {
  return {
    spendings: state.spendings
  };
};
const Table = connect(mapStateToProps)(TableIndex);
export default Table;
