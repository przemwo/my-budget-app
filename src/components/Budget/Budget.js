import React from 'react';
import { connect } from 'react-redux';
import { getIncomings } from '../../actions/actions';
import Row from './Row';

class Budget extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(getIncomings());
  };
  render() {
    const incomings = this.props.incomings.filter(incoming => incoming.status === 'active');
    console.log(incomings);
    return(
      <div>
      <h1>Budget</h1>
      <h3>Incomings</h3>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Expected</th>
            <th>Actual</th>
            <th>Description</th>
            <th>Difference</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {incomings.map((incoming, index) =>
            <Row
              key={incoming.id}
              index={index}
              incoming={incoming}
            />
          )}
        </tbody>
      </table>
      <h3>Spendings</h3>
      </div>
    );
  }
}
Budget.propTypes = {
  incomings: React.PropTypes.array
};
const mapStateToProps = (state) => {
  return {
    incomings: state.incomings
  };
};
export default connect(mapStateToProps)(Budget);
