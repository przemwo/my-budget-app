import React from 'react';
import CellAmount from './CellAmount';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCellAmountEdited: false,
      initAmount: this.props.spending.amount,
      amount: this.props.spending.amount,
      isAmountChanged: false
    };
    this.isCellAmountEditedToggle = this.isCellAmountEditedToggle.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      return {
        isCellAmountEdited: false,
        initAmount: nextProps.spending.amount,
        amount: nextProps.spending.amount,
        isAmountChanged: false
      }
    });
  }
  changeAmount(e) {
    e.preventDefault();
    const amount = parseInt(e.target.value, 10) || '';
    let isAmountChanged = false;
    if(amount !== this.state.initAmount) {
      isAmountChanged = true;
    }
    this.setState((prevState, props) => {
      return { amount, isAmountChanged };
    });
  }
  isCellAmountEditedToggle() {
    this.setState((prevState, props) => {
      return { isCellAmountEdited: !prevState.isCellAmountEdited};
    });
  }
  handleOnBlur(e) {
    this.setState((prevState, props) => {
      return { isCellAmountEdited: !prevState.isCellAmountEdited};
    });
    if(this.state.isAmountChanged) {
      this.props.handleChangeAmount(e, this.props.spending.id)
    }
  }
  render() {
    let day = new Date(this.props.spending.timestamp);
    day = day.getDate();
    const spending = this.props.spending;
    const index = this.props.index;
    const handleDeleteSpending = this.props.handleDeleteSpending;
    const handleChangeAmount = this.props.handleChangeAmount;
    return(
      <tr>
        <td>{index}</td>
        <td>{day < 10 ? 0 : '' }{day}</td>
        <CellAmount amount={this.state.amount} isEdited={this.state.isCellAmountEdited} isEditedToggle={this.isCellAmountEditedToggle} handleChangeAmount={this.changeAmount} handleOnBlur={this.handleOnBlur}  />
        <td>{spending.category}</td>
        <td>
          {spending.description}
          <span role="button" className="glyphicon glyphicon-trash pull-right" aria-hidden="true" onClick={handleDeleteSpending} value={spending.id}></span>
        </td>
      </tr>
    );
  }

}

export default Row;
