import GroupModel from '../models/groupModel';
import {groupValid} from '../validation/index';
import UserModel from '../models/userModel';

let createNewGroup = (userCreatedId,listUserIdToCreateGroup,groupName,description,userAmount) => {
  return new Promise( async (resolve, reject) => {
    // Check mỗi người chỉ được tạo tối đa 10 nhóm 
    let amountGroupThisUserCreated = await GroupModel.findByUserCreatedId(userCreatedId);

    if(amountGroupThisUserCreated.length > 10) return reject(groupValid.exeededGroupAllow);

    let inforGroupCreated = await GroupModel.createNewGroup(userCreatedId,listUserIdToCreateGroup,groupName,description,userAmount);



    return resolve(inforGroupCreated);
  })
}

let getListChatGoupMess = (userId) => {
  return new Promise( async (resolve, reject) => {
    let listChatGoupMess = await GroupModel.findById(userId);

    return resolve(listChatGoupMess);
  })
}

let checkIsAdmin = (userId,groupId) => {
  return new Promise( async (resolve, reject) => {
  
    let resultCheck = await GroupModel.checkIsAdmin(userId,groupId);
    if(resultCheck === null) return reject();

    return resolve();

  })
}

let getGroupInformation = (userId,groupId) => {
  return new Promise( async (resolve, reject) => {
    // check user co trong nhom khong
    let groupInfo = await GroupModel.groupInfo(userId, groupId);

    if(groupInfo === null) return reject();

    let inforMembersInGroup = await UserModel.findInforMembersInGroup(groupInfo.members)

    // thông tin những người trong nhớm 
    groupInfo.members = [];
    let inForMembersToReteurn = {}

    inforMembersInGroup.forEach((member =>{
      inForMembersToReteurn.username = member.username;
      inForMembersToReteurn.class = member.class
      inForMembersToReteurn.avatar = member.avatar

      groupInfo.members.push(inForMembersToReteurn);

      inForMembersToReteurn = {}
    }))

    // lấy thông tin người thành lập nhóm 
    let inforUserCreated = await UserModel.inforUser(userId);
    
    let inforGroupToReturn = {
      messageAmount: groupInfo.messageAmount,
      avatar: groupInfo.avatar,
      members: groupInfo.members,
      _id: groupInfo._id,
      userCreated: {
        username: inforUserCreated.username,
        avatar: inforUserCreated.avatar
      },
      groupName: groupInfo.groupName,
      description: groupInfo.description,
      userAmount: groupInfo.userAmount,
      createdAt: groupInfo.createdAt,
    }

    return resolve(inforGroupToReturn);
  })
}

let leaveGroupChat = async (userId,groupId) => {
  GroupModel.leaveGroupChat(userId,groupId);
}

module.exports = {
  createNewGroup: createNewGroup,
  getListChatGoupMess: getListChatGoupMess,
  checkIsAdmin: checkIsAdmin,
  getGroupInformation: getGroupInformation,
  leaveGroupChat: leaveGroupChat
}