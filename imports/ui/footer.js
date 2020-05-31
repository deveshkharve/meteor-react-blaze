import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './footer.html';


Template.Footer.onRendered(()=>{
    console.log('Footer')
})


Template.Profile.helpers({
    profileName() {
        console.log('profile');
        return "Devesh"
    }
})

Template.Footer.events({

})