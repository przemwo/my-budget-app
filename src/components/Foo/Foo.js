import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/actions';


const toggleIsEditing = (prevState, props) => {
  return {
    isEditing: !prevState.isEditing
  };
};
class Row extends React.Component {
  state = {
    isEditing: false
  };
  toggleIsEditing = () => {
    this.setState(toggleIsEditing);
  };
  handleOnChangeName = (e) => {
    const { value } = e.target;
    console.log(value);
  };
  render() {
    const { category } = this.props;
    if(this.state.isEditing) {
      Element = (
        <input
          type="text"
          value={category.name}
          onChange={this.handleOnChangeName}
          onClick={this.toggleIsEditing}
          autoFocus
        />
      );
    } else {
      Element = (
        <p
          onClick={this.toggleIsEditing}
        >
          {category.name} {category.favourite ? 'favourite' : 'not favourite'}
        </p>
      );
    }
    return(
      <div>
        {Element}
      </div>
    );
  }
}

class Foo extends React.Component {
  render() {
    const { categories } = this.props;
    return(
      <div>
        {categories.map(category =>
          <Row key={category.name} category={category} />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  // Get only active categories
  const categories = state.categories.filter(category => category.status === 'active');
  return {
    categories: categories
  };
};
export default connect(mapStateToProps)(Foo);
