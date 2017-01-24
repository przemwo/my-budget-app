import React from 'react';
import Input from '../form/Input';

const Row = (props) => {
  if(props.isEditing) {
    return <EditRow {...props} />;
  }
  return <NormalRow {...props} />;
};


const NormalRow = ({
  index,
  spending,
  toggleIsEditing
}) => {
  function handleOnClick() {
    toggleIsEditing(spending.id);
  }
  return(
    <tr
      role="button"
      onClick={handleOnClick}
    >
      <td>{index + 1}</td>
      <td>{spending.day < 10 ? 0 : '' }{spending.day}</td>
      <td>{spending.amount}</td>
      <td>{spending.category}</td>
      <td>{spending.description}</td>
    </tr>
  );
};


class EditRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.spending.amount,
      description: this.props.spending.description,
      day: this.props.spending.day
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }
  handleOnClick() {
    this.props.toggleIsEditing(this.props.spending.id);
  }
  onChangeAmount(e) {
    let { value: amount} = e.target;
    const reg = /^\d+$/;
    if(reg.test(amount)) {
      amount = parseInt(amount, 10);
      this.setState({ amount });
    }
  }
  onChangeDay(e) {
    let { value: day} = e.target;
    const reg = /^\d+$/;
    if(reg.test(day) && (parseInt(day) >= 1) && (parseInt(day) <= 31)) {
      day = parseInt(day, 10);
      this.setState({ day });
    }
  }
  onChangeDescription(e) {
    const { value: description} = e.target;
    this.setState({ description });
  }
  updateDescription(e) {
    this.props.updateDescription(this.props.spending.id, this.state.description);
  }
  updateAmount(e) {
    this.props.updateAmount(this.props.spending.id, this.state.amount);
  }
  updateDay(e) {
    this.props.updateDay(this.props.spending.id, this.state.day);
  }
  render() {
    return(
      <tr
        role="button"
        onClick={this.handleOnClick}
        >
        <td>{this.props.index + 1}</td>
        <td>
          <Input
            value={this.state.day}
            onChange={this.onChangeDay}
            onBlur={this.updateDay}
            />
        </td>
        <td>
          <Input
            value={this.state.amount}
            onChange={this.onChangeAmount}
            onBlur={this.updateAmount}
            />
        </td>
        <td>{this.props.spending.category}</td>
        <td>
          <Input
            value={this.state.description}
            onChange={this.onChangeDescription}
            onBlur={this.updateDescription}
            />
        </td>
      </tr>
    );
  }
}

export default Row;
