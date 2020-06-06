import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
// Task component - represents a single todo item
export default class Task extends Component {
  
  /**
   * delete task from mongo
   */
  deleteThisTask = () => {
    const { task }= this.props;
    Meteor.call('tasks.remove', task._id);
  }
  
  /**
   * toggle task for the user
   */
  toggleChecked = () => {
    // Set the checked property to the opposite of its current value
    const { task }= this.props;
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  }
  
  /**
   * toggle if task is private/public
   */
  togglePrivate = () => {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  render() {
    
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    return (
      <li className={taskClassName}>
        {
          true ?  <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button> : ""
        }
        
 
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : '' }

        <span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>
      </li>
    );
  }
}