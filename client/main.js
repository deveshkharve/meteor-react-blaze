import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/account.config';
import App from '../imports/ui/App';
import './main.html'; 
// need to add as we have a hybrid app, main.html is the main template for rendering

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
