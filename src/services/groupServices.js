import GroupModel from '../models/groupModel';
import {groupValid} from '../validation/index';
import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import _ from 'lodash';

const LIMIT_FRIENDS_TEKEN = 20;

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

let addMemberToGroup = async (userAddMemberId,userIdToAddGroup,groupId) => {
  // kiểm tra xem người mà thêm thành viên có ở trong nhóm không 
  let checkUserIsInGroup = await GroupModel.checkMemberIsInGroup(userAddMemberId,groupId);
  if(checkUserIsInGroup === null) return

  // kiểm tra xem người được thêm đã ở trong nhóm chưa 
  checkUserIsInGroup = await GroupModel.checkMemberIsInGroup(userIdToAddGroup,groupId);
  if(checkUserIsInGroup !== null) return
  
  GroupModel.addMemberToGroup(userIdToAddGroup,groupId);
  
}

let searchMemberToAddGroup = (searcherId,keyWords,skip,groupId) => {
  return new Promise( async (resolve, reject) => {

    let listFriends = await ContactModel.findUserById(searcherId);

    if(listFriends.length === 0) return reject();

    // tìm id những bạn bè trong phần contact
    let listFriendsId = [];
    listFriends.forEach( friend => {
      listFriendsId.push(friend.senderId);
      listFriendsId.push(friend.receiverId);
    });

    // lọc bỏ id của chính mình
    _.remove(listFriendsId, function(id) {
      return id  == searcherId;
    });

    // tìm id những member trong group
    let listMembersId = await GroupModel.getGroupUsers(groupId);
    // lọc bỏ những người đã ở trong nhóm 
    listMembersId.members.forEach( memberId => {
      _.remove(listFriendsId, function(id) {
        return id  == memberId;
      });
    })

    if(listFriendsId.length === 0) return reject();

    // tìm infor những id trong list đã lọc và trả về 
    let inforUser = await UserModel.searchMemberToAddGroup(listFriendsId,keyWords,LIMIT_FRIENDS_TEKEN,skip);

    return resolve(inforUser);
  })
}

module.exports = {
  createNewGroup: createNewGroup,
  getListChatGoupMess: getListChatGoupMess,
  checkIsAdmin: checkIsAdmin,
  getGroupInformation: getGroupInformation,
  leaveGroupChat: leaveGroupChat,
  addMemberToGroup: addMemberToGroup,
  searchMemberToAddGroup: searchMemberToAddGroup
}