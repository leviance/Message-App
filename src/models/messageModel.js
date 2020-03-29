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
  isReadGroup: {type: Array},
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
  sendGroupMess(sender,receiver,message){
    return this.create({"sender": sender, "receiver": receiver,"text" : message , "isReadGroup": []});
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
        {"isReadGroup": []}
      ]
    }).exec();
  },
  messagePersionalViewed(senderMessId, receiverMessId){
    return this.updateMany({
      $and: [
        {"sender.id": receiverMessId},
        {"receiver.id": senderMessId},
        {"isRead": false}
      ]
    },{"isRead": true}).exec();
  },
  messageGroupViewed(userViewedMess, groupId){
    return this.updateMany({
      $and: [
        {"receiver.id": groupId},
        {"sender.id": {$ne: userViewedMess[0].idUserViewed}},
        {$or: [
          {"isReadGroup": []},
          {"isReadGroup": {$elemMatch: {idUserViewed: {$ne: userViewedMess[0].idUserViewed}}}}
        ]}
      ]
    },{$addToSet: {isReadGroup: userViewedMess}}).exec();
  }
}

module.exports = mongoose.model("Messages",messagesSchema);