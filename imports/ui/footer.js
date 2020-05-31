import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './footer.html';


Template.Footer.onRendered(()=>{
    console.log('Footer')
})

// helper to get profile data
Template.Profile.helpers({
    profileName() {
        console.log('profile');
        return "Devesh Kharve"
    },

    profileLink() {
        return "https://www.linkedin.com/in/deveshkharve/";
    }
})
