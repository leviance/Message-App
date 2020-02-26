import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let messagesSchema = new Schema({
  sender: {
    id: String, 
    username: String,
    avatar: String
  },
  receiver: {
    id: String, 
    username: String,
    avatar: String
  },
  text: String,
  isRead: {type: Boolean , default: false},
  file: String,
  createdAt: {type: Number, default: Date.now},
  removedAt: {type: Number, default: null},
  updatedAt: {type: Number, default: null}
});

messagesSchema.statics = {

}

module.exports = mongoose.model("Messages",messagesSchema);