import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Task component - represents a single todo item
export default class TaskForm extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
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