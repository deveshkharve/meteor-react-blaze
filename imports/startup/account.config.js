import { Accounts } from 'meteor/accounts-base';
 
// config the accounts to use username only for now, by default uses email
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})