import mongoose from 'mongoose';

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
  }
}

module.exports =  mongoose.model("Contacts",contactSchema)