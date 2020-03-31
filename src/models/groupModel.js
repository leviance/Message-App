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
  },
  getGroupUsers(groupId){
    return this.findOne({"_id" : groupId}, {members: 1, groupName: 1, avatar: 1}).exec();
  },
  chatTogether(groupId){
    return this.update({"_id": groupId},{"updatedAt": Date.now});
  },
  updateMessAmount(groupId){
    return this.updateOne({"_id": groupId},{$inc: {"messageAmount" : 1}}).exec();
  },
  checkIsAdmin(userId,groupId){
    return this.findOne({
      $and:[
        {"userCreatedId": userId},
        {"_id": groupId}
      ]
    }).exec();
  },
  groupInfo(userId, groupId){
    return this.findOne({
      $and:[
        {"_id": groupId},
        {"members": userId}
      ]
    }).exec();
  },
  leaveGroupChat(userId,groupId){
    this.updateOne({"_id": groupId},{
      $pull: {"members": userId}
    }).exec();
  },
  checkMemberIsInGroup(userId,groupId){
    return this.findOne({
      $and:[
        {"_id": groupId},
        {"members": userId}
      ]
    })
  },
  addMemberToGroup(userIdToAddGroup,groupId){
    this.updateOne({"_id": groupId},{$push: {members: userIdToAddGroup}}).exec();
  }
}

module.exports = mongoose.model("Groups",groupSchema);