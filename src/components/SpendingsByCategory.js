import React from 'react';
import { connect } from 'react-redux';
import { getSpendings } from '../actions/actions';
import SpendingsByCategoryTable from './SpendingsByCategoryTable';

class SpendingsByCategoryIndex extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getSpendings());
  }
  render() {
    let spendings = this.props.spendings;
    spendings = spendings.filter(spending => spending.status === 'active');
    let tmp = spendings.find((element) => {
      return element.category === 'mieszkanie';
    });
    spendings = spendings.reduce((cum, spending) => {
      let item = cum.find((element) => {
        return element.category === spending.category;
      });
      if(!item) {
        cum = [...cum, { category: spending.category, amount: 0}];
      }
      cum = cum.map(categoryItem => {
        if(categoryItem.category === spending.category) {
          categoryItem.amount += spending.amount;
        }
        return categoryItem;
      });
      return cum;
    }, []);
    return(
      <SpendingsByCategoryTable
        spendings={spendings}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    spendings: state.spendings
  };
};
const SpendingsByCategory = connect(mapStateToProps)(SpendingsByCategoryIndex);
export default SpendingsByCategory;
