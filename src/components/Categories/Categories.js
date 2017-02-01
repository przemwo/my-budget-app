import React from 'react';
import { connect } from 'react-redux';
import { getCategories, updateCategory, addCategory, deleteCategory } from '../../actions/actions';
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
const addNewCategory = (state, props) => {
  console.log(state);
  return {
    categories: [...state.categories, { id: 'new', name: 'name', status: 'active', favourite: false }]
  };
};
const toggleCanAddNewCategory = (state, props) => {
  return {
    canAddCategory: !state.canAddCategory
  };
};

class Categories extends React.Component {
  state = {
    categories: [],
    editedCategoryId: '',
    canAddCategory: true
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
    if(this.state.editedCategoryId) {
      const newCategory = this.state.categories.filter(category => category.id === this.state.editedCategoryId)[0];
      this.saveChanges(newCategory)
    }
    this.setState(changeEditedCategoryId(id));
  };
  updateRow = (category) => {
    this.setState(updateCategories(category));
  };
  saveChanges = (newCategory) => {
    const { dispatch } = this.props;
    const oldCategory = this.getCategoryById(newCategory.id);
    // Save new category
    if(!oldCategory) {
      dispatch(addCategory(newCategory)).then(() => {
        toastr.success('Category has benn added');
        this.setState(toggleCanAddNewCategory);
      });
      // Save only when changed
    }else if(
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
  addNewCategory = () => {
    this.setState(toggleCanAddNewCategory);
    this.setState(addNewCategory);
  };
  deleteCategory = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteCategory(id)).then(() => {
      toastr.success('Category has benn deleted');
    });
  };
  render() {
    const categories = [...this.state.categories].filter(category => category.status === 'active');
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
                deleteCategory={this.deleteCategory}
              />
            )}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.addNewCategory}
          disabled={!this.state.canAddCategory}
        >
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
