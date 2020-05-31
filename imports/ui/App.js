import React from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import BlazeWrapper from './BlazeWrapper';

import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';


class App extends React.Component {

  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }

  addTask = (text) => {
    Meteor.call('tasks.insert', text);
  }

  renderTasks = () => {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    const currentUserId = this.props.currentUser && this.props.currentUser._id;
    return filteredTasks.map(task => {
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task 
          key={task._id} 
          task={task} 
          showPrivateButton={showPrivateButton}
        />)

    });
  }

  toggleHideCompleted = () => {
    console.log('toggle');

    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  render() {
    return (
      <div className="container">
        <AccountsUIWrapper />
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          { this.props.currentUser ? <TaskForm submitHandler={this.addTask} /> : "" }

        </header>
        
        <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide Completed Tasks
        </label>

        <ul>
          {this.renderTasks()}
        </ul>
        <BlazeWrapper templateName="Footer"/>
      </div>
    );
  }
} 


export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);