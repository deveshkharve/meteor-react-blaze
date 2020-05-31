import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Task form component - add task
export default class TaskForm extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    // use react-dom to interact with the elements by ref value
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    console.log('text', text);
    this.props.submitHandler(text);
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit} >
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new tasks"
        />
      </form>
    );
  }
}