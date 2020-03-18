import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let notificationSchema = new Schema({
  senderNotif:{
    id: String,
    username: String,
    avatar: String
  },
  receiverNotif:{
    id: String,
    username: String,
    avatar: String
  },
  typeNotif: String, 
  content: String, 
  isRead: {type: Boolean , default: false},
  createdAt: {type: Number, default: Date.now}
});

notificationSchema.statics = {
  createNew(notification){
    return this.create(notification)
  },
  getListNotifications(userId,limit){
    return this.find({"receiverNotif.id" : userId}).sort({"createdAt" : -1}).limit(limit).exec();
  },
  tickReaded(listNotifUnread){
    return this.updateMany(
      {"_id" : {$in: listNotifUnread}},
      {"isRead" : true}
    ).exec();
  },
  getMore(userId ,skip, limit){
    return this.find({"receiverNotif.id" : userId}).sort({"createdAt" : -1}).skip(skip).limit(limit).exec();
  },
  removeAll(targetId){
    this.deleteMany({"receiverNotif.id" : targetId}).exec();
  }
};

module.exports = mongoose.model("Notifications",notificationSchema);