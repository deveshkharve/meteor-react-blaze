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
    
    // init state
    this.state = {
      hideCompleted: false,
    };
  }

  /**
   * handler to add task in db
   */
  addTask = async (text) => {
    
    const res = this.props.tasks.filter(item => item.text == text);
    Meteor.call('tasks.insert', text, (error, res)=> {
      console.log('err', error, 'res', res);
      if (error){ 
        alert(error.error);
        return;
      }  
    });
  }

  /**
   * returns the Task component from the props injected by the tracker
   */
  renderTasks = () => {
    
    let filteredTasks = this.props.tasks;
    
    // check if to hide the completed task and filter
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    
    // get the current user Id
    const currentUserId = this.props.currentUser && this.props.currentUser._id;
    
    return filteredTasks.map(task => {
      // check if current user is the owner and set private/public set button
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
        <BlazeWrapper templateName="Footer" customProps={{id: 1}}/>
      </div>
    );
  }
} 


export default withTracker(() => {
  // subscribe to the published object task, only Task.find will be executed, 
  // and the parameters will be merged, the find query and sort are merged
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);