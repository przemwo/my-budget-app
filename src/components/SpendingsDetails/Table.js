import React from 'react';
import { connect } from 'react-redux';
import { updateSpending, deleteSpending } from '../../actions/actions';
import Row from './Row';
import dynamicSort from '../../utils/dynamicSort';

class TableIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedRowId: '',
      sortBy: 'day',
      sortOrder: 1
    };
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.sortTableBy = this.sortTableBy.bind(this);
    this.removeSpending = this.removeSpending.bind(this);
  }
  toggleIsEditing(id) {
    id = id || '';
    this.setState((prevState, props) => {
      return {
        editedRowId: id
      };
    });
  }
  updateRow(id, amount, description, day, category) {
    const {dispatch, spendings }  = this.props;
    const spending = this.getSpending(id, spendings);
    if(amount !== spending.amount) {
      dispatch(updateSpending(id, Object.assign({}, spending, {amount: amount})));
    }
    if(description !== spending.description) {
      dispatch(updateSpending(id, Object.assign({}, spending, {description: description})));
    }
    if(day !== spending.day) {
      dispatch(updateSpending(id, Object.assign({}, spending, {day: day})));
    }
    if(category !== spending.category) {
      dispatch(updateSpending(id, Object.assign({}, spending, {category: category})));
    }
  }
  removeSpending(id) {
    const { dispatch, spendings } = this.props;
    const spending = this.getSpending(id, spendings);
    dispatch(deleteSpending(id, Object.assign({}, spending, {status: "deleted"})));
  }
  getSpending(id, spendings) {
    return spendings.filter(spending => spending._id === id)[0];
  }
  sortTableBy(e) {
    const { value: sortBy } = e.target;
    this.setState((prevState, props) => {
      let sortOrder;
      if(sortBy === prevState.sortBy) {
        sortOrder = (-1) * prevState.sortOrder;
      } else {
        sortOrder = 1;
      }
      return {
        sortBy,
        sortOrder
      };
    });
  }
  render() {
    const categories = this.props.categories;
    let spendings = this.props.spendings;
    spendings = spendings.filter(spending => spending.status === 'active');
    const total = spendings.reduce((sum, spending) => {
      return sum += parseInt(spending.amount);
    }, 0);
    spendings = spendings.sort(dynamicSort(this.state.sortBy, this.state.sortOrder));
    return(
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th role="button" onClick={this.sortTableBy} style={{width: "75px"}} value="day">Day</th>
            <th role="button" onClick={this.sortTableBy} style={{width: "100px"}} value="amount">Amount</th>
            <th role="button" onClick={this.sortTableBy} style={{width: "125px"}} value="category">Category</th>
            <th role="button" onClick={this.sortTableBy} value="description">Description</th>
          </tr>
        </thead>
        <tbody>
          {spendings.map((spending, index) =>
            <Row
              key={spending._id}
              spending={spending}
              categories={categories}
              index={index}
              isEditing={this.state.editedRowId === spending._id}
              toggleIsEditing={this.toggleIsEditing}
              updateRow={this.updateRow}
              removeSpending={this.removeSpending}
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
  spendings: React.PropTypes.array,
  categories: React.PropTypes.array,
  dispatch: React.PropTypes.func
};
const mapStateToProps = (state) => {
  return {
    spendings: state.spendings,
    categories: state.categories
  };
};
const Table = connect(mapStateToProps)(TableIndex);
export default Table;
