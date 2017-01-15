import React from 'react';
import dynamicSort from '../utils/dynamicSort';

class SpendingsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sortBy: 'day'
    };
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleResetFilter = this.handleResetFilter.bind(this);
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
  handleChangeFilter(e) {
    e.preventDefault();
    const filter = this.state.filter === '' ? e.currentTarget.textContent.toLowerCase() : '';
    this.setState((prevState, props) => {
      return {
        filter
      };
    });
  }
  handleResetFilter(e) {
    e.preventDefault();
    this.setState((prevState, props) => {
      return {
        filter: ''
      };
    });
  }
  render() {
    let spendings = this.props.spendings;
    if(this.state.filter !== '') {
      spendings = spendings.filter(spending => spending.category === this.state.filter);
    }
    spendings.sort(dynamicSort(this.state.sortBy));
    const total = spendings.reduce((sum, spending) => {
      return sum + spending.amount;
    }, 0);
    return(
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th role="button" onClick={this.handleChangeSortBy} value="day">Day</th>
            <th role="button" onClick={this.handleChangeSortBy} value="amount">Amount</th>
            <th role="button" onClick={this.handleChangeSortBy} value="category">Category {this.state.filter !== '' && <span className="label label-warning">Filter</span>}</th>
            <th role="button" onClick={this.handleChangeSortBy} value="description">Description</th>
          </tr>
        </thead>
        <tbody>
          {spendings.map((spending, index) =>
            <tr key={spending.id}>
              <th>{++index}</th>
              <td>{spending.day < 10 ? 0 : '' }{spending.day}</td>
              <td>{spending.amount}</td>
              <td role="button" onClick={this.handleChangeFilter}>{spending.category}</td>
              <td>{spending.description}</td>
            </tr>
          )}
          <tr className="info">
            <th></th>
            <th></th>
            <th>{total}</th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SpendingsTable;
