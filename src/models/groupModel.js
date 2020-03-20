import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let groupSchema = new Schema({
  groupName: String,
  userCreatedId : String,
  userAmount : Number,
  messageAmount : { type: Number, default: 0}, 
  avatar: {type: String, default: "avatarGroup.jpg"},
  members: [],
  description: String,
  createdAt : { type: Number, default: Date.now},
  removedAt: { type: Number, default: null},
  updatedAt: { type: Number, default: Date.now} 
});

groupSchema.statics = { 
  createNewGroup(userCreatedId,listUserIdToCreateGroup,groupName,description,userAmount){
    return this.create({
      "userCreatedId": userCreatedId,
      "members": listUserIdToCreateGroup,
      "groupName": groupName,
      "description": description,
      "userAmount": userAmount
     })
  },
  findByUserCreatedId(userCreatedId){
    return this.find({"userCreatedId": userCreatedId}).exec();
  },
  findById(userId){
    return this.find({"members": userId}).sort({"updatedAt": 1}).exec();
  }
}

module.exports = mongoose.model("Groups",groupSchema);