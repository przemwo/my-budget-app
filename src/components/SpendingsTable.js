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
  }
  handleChangeSortBy(e) {
    e.preventDefault();
    const sortBy = e.currentTarget.textContent.toLowerCase();
    this.setState((prevState, props) => {
      return {
        sortBy
      };
    });
  }
  render() {
    let spendings = this.props.spendings;
    spendings.sort(dynamicSort(this.state.sortBy));
    const total = spendings.reduce((sum, spending) => {
      return sum + spending.amount;
    }, 0);
    return(
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th role="button" onClick={this.handleChangeSortBy}>Day</th>
            <th role="button" onClick={this.handleChangeSortBy}>Amount</th>
            <th role="button" onClick={this.handleChangeSortBy}>Category</th>
            <th role="button" onClick={this.handleChangeSortBy}>Description</th>
          </tr>
        </thead>
        <tbody>
          {spendings.map((spending, index) =>
            <tr key={spending.id}>
              <th>{++index}</th>
              <td>{spending.day < 10 ? 0 : '' }{spending.day}</td>
              <td>{spending.amount}</td>
              <td>{spending.category}</td>
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
