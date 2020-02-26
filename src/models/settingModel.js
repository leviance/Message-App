import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let settingSchema = new Schema({
  userId: String,
  block: Array,
  receiveNotifications: {type: Boolean, default: true},
  allowSearches: {type: Boolean, default: true},
  receiveStrangerMess: {type: Boolean, default: true},
  privateProfile: {type: Boolean, default: false},
  darkMode: {type: Boolean, default: false},
  twoStepsVerification: {type: Boolean, default: false},
  receiveFriendNotifications: {type: Boolean, default: false},
  sendNotficationByEmail: {type: Boolean, default: false},
  autoChangePassword: {type: Boolean, default: false},
  notificationSuspectLogins: {type: Boolean, default: false},
  favoritesContact: [
    {userId: String}
  ]
});

settingSchema.statics = {

};

module.exports = mongoose.model("Settings",settingSchema)