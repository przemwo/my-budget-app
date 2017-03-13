import React from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../actions/actions';
import Button from '../form/Button';

const ShowDate = ({dates, onClick}) => {
  return(
    <div
      onClick={onClick}
      role="button"
    >
      <h4>{dates.year}/{dates.month}/{dates.day}</h4>
    </div>
  );
};

const EditDate = ({dates, toggleIsEditing, changeDate}) => {
  let months = [...Array(13).keys()].slice(1);
  let days = [...Array(32).keys()].slice(1);
  let yearSelect = null;
  let monthSelect = null;
  let daySelect = null;
  function handleChangeDate() {
    changeDate(parseInt(yearSelect.value, 10), parseInt(monthSelect.value, 10), parseInt(daySelect.value, 10));
  }
  return(
    <div className="form-inline">
      <div className="form-group">
        <select ref={element => yearSelect = element} className="form-control" value={dates.year} onChange={handleChangeDate}>
          {[2017].map((year, index) =>
            <option key={index} value={year}>{year}</option>
          )}
        </select>
      </div>
      <div className="form-group">
        <select ref={element => monthSelect = element} className="form-control" value={dates.month} onChange={handleChangeDate}>
          {months.map((month, index) =>
            <option key={index} value={month}>{month}</option>
          )}
        </select>
      </div>
      <div className="form-group">
        <select ref={element => daySelect = element} className="form-control" value={dates.day} onChange={handleChangeDate}>
          {days.map((day, index) =>
            <option key={index} value={day}>{day}</option>
          )}
        </select>
      </div>
      <Button
        onClick={toggleIsEditing}
        type="btn-primary"
      >
        Save
      </Button>
    </div>
  );
};

class DateIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }
  toggleIsEditing(e) {
    e.preventDefault();
    this.setState((prevState, props) => {
      return {
        isEditing: !prevState.isEditing
      };
    });
  }
  changeDate(year, month, day) {
    const { dispatch } = this.props;
    dispatch(updateDate({
      year,
      month,
      day
    }));
  }
  render() {
    const dates = this.props.dates;
    let dateComponent;
    if(this.state.isEditing) {
      dateComponent = <EditDate dates={dates} toggleIsEditing={this.toggleIsEditing} changeDate={this.changeDate} />;
    } else {
      dateComponent = <ShowDate dates={dates} onClick={this.toggleIsEditing} />;
    }
    return(
      <div>
        {dateComponent}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dates: state.dates
  };
};
const Date = connect(mapStateToProps)(DateIndex);
export default Date;
