import React from 'react';
import dynamicSort from '../utils/dynamicSort';
import SpendingsDetailsTable from './SpendingsDetailsTable';

class SpendingsDetails extends React.Component {
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
      <SpendingsDetailsTable
       spendings={spendings}
       handleChangeSortBy={this.handleChangeSortBy}
       handleChangeFilter={this.handleChangeFilter}
       filter={this.state.filter}
       total={total}
      />
    );
  }
}

export default SpendingsDetails;
