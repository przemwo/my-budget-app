import React from 'react';
import { connect } from 'react-redux';
import { getCategories, updateCategory } from '../../actions/actions';
import Row from './Row';
import toastr from 'toastr';

toastr.options = {
  "newestOnTop": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "timeOut": "2000"
}

const setCategories = (categories) => (state, props) => {
  return {
    categories
  };
};
const changeEditedCategoryId = (id) => (state, props) => {
  return {
    editedCategoryId: id
  };
};
const updateCategories = (updatedCategory) => (state, props) => {
  const newCategories = state.categories.map(category => {
    if(category.id === updatedCategory.id) {
      return updatedCategory;
    }
    return category;
  });
  return {
    categories: newCategories
  };
};

class Categories extends React.Component {
  state = {
    categories: [],
    editedCategoryId: ''
  };
  componentDidMount = () => {
    if(this.props.categories.length === 0) {
      const { dispatch } = this.props;
      dispatch(getCategories());
    } else {
      this.setState(setCategories(this.props.categories));
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.categories !== this.props.categories) {
      this.setState(setCategories(nextProps.categories));
    }
  };
  toggleIsEditing = (id) => {
    this.setState(changeEditedCategoryId(id));
  };
  updateRow = (category) => {
    this.setState(updateCategories(category));
  };
  saveChanges = (newCategory) => {
    const { dispatch } = this.props;
    const oldCategory = this.getCategoryById(newCategory.id);
    // Save only when changed
    if(
      (oldCategory.name !== newCategory.name) ||
      (oldCategory.favourite !== newCategory.favourite)
    ) {
      dispatch(updateCategory(newCategory.id, newCategory)).then(() => {
        toastr.success('Category has been updated');
      });
    }
  };
  getCategoryById = (id) => {
    return this.props.categories.filter(category => category.id === id)[0];
  };
  render() {
    const categories = this.state.categories;
    const editedCategoryId = this.state.editedCategoryId;
    return(
      <div>
        <h2>Manage Categories</h2>
        <h3>Spendings categories</h3>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) =>
              <Row
                key={category.id}
                category={category}
                categories={categories}
                index={index}
                isEditing={category.id === editedCategoryId}
                toggleIsEditing={this.toggleIsEditing}
                updateRow={this.updateRow}
                saveChanges={this.saveChanges}
              />
            )}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary">
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add category
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};
export default connect(mapStateToProps)(Categories);
