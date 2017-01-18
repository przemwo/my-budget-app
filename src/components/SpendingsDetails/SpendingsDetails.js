import React from 'react';
import dynamicSort from '../../utils/dynamicSort';
import Table from './Table';

class SpendingsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'timestamp'
    };
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
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
       handleDeleteSpending={this.props.handleDeleteSpending}
       handleChangeSortBy={this.handleChangeSortBy}
       handleChangeAmount={this.props.handleChangeAmount}
       total={total}
      />
    );
  }
}

export default SpendingsDetails;
