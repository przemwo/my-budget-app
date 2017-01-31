import React from 'react';
import Input from '../form/Input';

const Row = (props) => {
  if(props.isEditing) {
    return <RowEdited {...props} />;
  } else {
    return <RowNormal {...props} />;
  }
};

const RowNormal = ({
  category,
  index,
  toggleIsEditing
}) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    const id = category.id;
    toggleIsEditing(id);
  };
  return(
    <tr
      role="button"
      onClick={handleOnClick}
    >
      <td>{index + 1}</td>
      <td>{category.name} {category.favourite && <span style={{color: "#ffcc00"}} className="glyphicon glyphicon-star" aria-hidden="true"></span>}</td>
    </tr>
  );
};

const RowEdited = ({
  category,
  index,
  updateRow,
  categories,
  toggleIsEditing,
  saveChanges
}) => {
  const handleOnChangeCheckbox = (e) => {
    category = Object.assign({}, category, { favourite: !category.favourite });
    updateRow(category);
  };
  const handleOnChangeInput = (e) => {
    const { value } = e.target;
    category = Object.assign({}, category, { name: value });
    updateRow(category);
  };
  const handleOnKeyUp = (e) => {
    const { keyCode } = e;
    if(keyCode !== 27) {
      return false;
    }
    toggleIsEditing();
    saveChanges(category);
  };
  return(
    <tr key={category.id}>
      <td>{index + 1}</td>
      <td>
        <form className="form-inline">
          <Input
            value={category.name}
            onChange={handleOnChangeInput}
            onKeyUp={handleOnKeyUp}
          />
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={category.favourite}
                onChange={handleOnChangeCheckbox}
                onKeyUp={handleOnKeyUp}
              />
              {' '}
              Favourite
            </label>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default Row;
