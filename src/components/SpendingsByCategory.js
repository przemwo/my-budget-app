import React from 'react';
import SpendingsByCategoryTable from './SpendingsByCategoryTable';

class SpendingsByCategory extends React.Component {
  constructor() {
    super();
  }
  render() {
    let spendings = this.props.spendings;
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

export default SpendingsByCategory;
