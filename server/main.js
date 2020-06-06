import { Meteor } from 'meteor/meteor';
// import Router from 'meter'
import '../imports/api/tasks.js';


Meteor.startup(() => {
  console.log('server is up');
  // If the Links collection is empty, add some data.
  // Router.route('/users',{where: 'server'})
  //   .get(function(){
  //       this.response.setHeader('Content-Type','application/json');
  //       this.response.end(JSON.stringify({id: 1, name: 'Devesh'}));
  //   })
    
});
