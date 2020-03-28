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
  img: String,
  createdAt: {type: Number, default: Date.now},
  removedAt: {type: Number, default: null},
  updatedAt: {type: Number, default: null}
});

messagesSchema.statics = {
  findMessages(senderMessId, receiverMessId, limit){
    return this.find({
      $or: [
        {
          $and: [
            {"sender.id": senderMessId},
            {"receiver.id" : receiverMessId},
            {"removedAt" : null}
          ]
        },
        {
          $and: [
            {"sender.id": receiverMessId},
            {"receiver.id" : senderMessId},
            {"removedAt" : null}
          ]
        }
      ]
    }).sort({"createdAt" : -1}).limit(limit).exec();
  },
  sendMess(sender,receiver,message){
    return this.create({"sender": sender, "receiver": receiver,"text" : message });
  },
  findGroupMessages(groupId,limit){
    return this.find({
      $and: [
        {"receiver.id":groupId },
        {"removedAt" : null}
      ]
    }).sort({"createdAt" : -1}).limit(limit).exec();
  },
  findMessagesUnRead(senderMessId, receiverMessId){
    return this.find({$and: [
      {"sender.id": senderMessId},
      {"receiver.id": receiverMessId},
      {"isRead": false}
    ]}).exec();
  },
  findMessagesGroupUnRead(groupId,idUserGetNumMessUnRead){
    return this.find({
      $and: [
        {"receiver.id": groupId},
        {$nor: [{"sender.id": idUserGetNumMessUnRead}]},
        {"isRead": false}
      ]
    }).exec();
  }
}

module.exports = mongoose.model("Messages",messagesSchema);