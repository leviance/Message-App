import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let notificationSchema = new Schema({
  sender:{
    id: String,
    username: String,
    avatar: String
  },
  receiver:{
    id: String,
    username: String,
    avatar: String
  },
  type: String, 
  content: String, 
  isRead: {type: Boolean , default: false},
  createdAt: {type: Number, default: Date.now}
});

notificationSchema.statics = {

};

module.exports = mongoose.model("Notifications",notificationSchema);