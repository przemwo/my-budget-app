import React from 'react';
import ReactDOM from 'react-dom';

// Inspired by: https://github.com/kaivi/ReactInlineEdit
class InlineEditText extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    propertyName: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool,
    editingElement: React.PropTypes.string,
    staticElement: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    editingClassName: React.PropTypes.string,
    style: React.PropTypes.object
  }
  static defaultProps = {
    isEditing: false,
    editingElement: 'input',
    staticElement: 'span'
  };
  state = {
    isEditing: this.props.isEditing,
    text: this.props.text
  };
  componentWillReceiveProps(nextProps) {
    const isTextChanged = (nextProps.text !== this.props.text);
    if(isTextChanged) {
      this.setState({ text: nextProps.text });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.isEditing) {
      let editingElement = ReactDOM.findDOMNode(this.refs.editingElement);
      editingElement.focus();
    }
  }
  startEditing = () => {
    this.setState({ isEditing: true });
  };
  stopEditing = () => {
    if(this.state.text !== this.props.text) {
      this.setState({ isEditing: false, text: this.state.text });
      let changedProperty = {};
      changedProperty[this.props.propertyName] = this.state.text;
      this.props.handleChange(changedProperty);
    } else {
      this.cancelEditing();
    }
  };
  cancelEditing = () => {
    this.setState({ isEditing: false, text: this.props.text });
  };
  textChanged = (e) => {
    this.setState({ text: e.target.value });
  };
  handleOnKeyDown = (e) => {
    if(e.keyCode === 13) {
      this.stopEditing();
    } else if(e.keyCode === 27) {
      this.cancelEditing();
    }
  };
  render() {
    if(!this.state.isEditing) {
      const Element = this.props.staticElement;
      return <Element
        onClick={this.startEditing}
        className={this.props.className}
      >
        {this.state.text || this.props.placeholder}
      </Element>
    } else {
      const Element = this.props.editingElement;
      return <div className="form-group">
        <Element
          onKeyDown={this.handleOnKeyDown}
          onBlur={this.stopEditing}
          defaultValue={this.state.text}
          onChange={this.textChanged}
          placeholder={this.props.placeholder}
          className={this.props.editingClassName}
          ref="editingElement" />
      </div>
    }
  }
}
export default InlineEditText;
