import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);

let Schema = mongoose.Schema;

let contactSchema = new Schema({
  senderId: String,
  receiverId: String, 
  active: {type: Boolean , default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  removedAt: {type: Number, default: null}
})

contactSchema.statics = {
  createNew(senderId,receiverId){
    return this.create({"senderId": senderId, "receiverId": receiverId});
  },
  findContact(senderId,receiverId){
    return this.findOne({
      $or: [
        {
          $and: [
            {"senderId": senderId},
            {"receiverId": receiverId}
          ]
        },
        {
          $and: [
            {"receiverId": senderId},
            {"senderId": receiverId}
          ]
        }
      ]
    }).exec();
  },
  findUserById(senderId){
    return this.find({
      $or: [
        {"senderId": senderId},
        {"receiverId": senderId}
      ]
    }).exec();
  },
  getListReqContactSend(senderId,limit){
    return this.find({
      $and: [
        {"senderId": senderId},
        {"active": false}
      ]
    }).limit(limit).sort({"createdAt": -1}).exec();
  },
  getListReqContactReceived(receiverId, limit){
    return this.find({
      $and: [
        {"receiverId": receiverId},
        {"active": false}
      ]
    }).limit(limit).sort({"createdAt": -1}).exec();
  },
  acceptContact(senderId, receiverId){
    return this.findOneAndUpdate({
      $and: [
        {"senderId": senderId},
        {"receiverId" : receiverId}
      ]
    },{"active" : true}).exec();
  },
  cancelReqContactSend(senderId,receiverId){
    return this.findOneAndDelete({
      $and: [
        {"senderId": senderId},
        {"receiverId": receiverId}
      ]
    }).exec();
  }
}



module.exports =  mongoose.model("Contacts",contactSchema)