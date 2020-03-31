import {group} from '../services/index';
import {groupValid} from '../validation/index';
import socketValid from '../validation/socketValidation';

let createNewGroup = async (req, res) => {
  try {
    let listUserIdToCreateGroup = req.body.listIdUserAdded;
    let userCreatedId = req.session.user.userId;
    let groupName = req.body.groupName;
    let description = req.body.description;
    
    listUserIdToCreateGroup.push(userCreatedId);
    let userAmount = listUserIdToCreateGroup.length;

    await groupValid.validDataToCreateGroup(listUserIdToCreateGroup,groupName,description);
    
    let inforGroupCreated = await group.createNewGroup(userCreatedId,listUserIdToCreateGroup,groupName,description,userAmount);
    return res.status(200).send(inforGroupCreated);
  } catch (error) {
    return res.status(500).send(error);
  }

}

let checkIsAdmin = async (req, res) => {
  try {
    let userId = req.session.user.userId;
    let groupId = req.params.groupId;
    
    let resultCheck = await group.checkIsAdmin(userId,groupId);
    
    res.status(200).send(resultCheck);

  } catch (error) {
    return res.status(500).send(error);
  }

}

let getGroupInformation = async (req, res) => {
  try {
    let userId = req.session.user.userId;
    let groupId = req.params.groupId;

    let groupInfo = await group.getGroupInformation(userId, groupId);

    return res.status(200).send(groupInfo);

  } catch (error) {
    return res.status(500).send(error);
  }
}

let leaveGroupChat = (req, res) => {
  let userId = req.session.user.userId;
  let groupId = req.params.groupId;
 
  group.leaveGroupChat(userId,groupId);
}

let addMemberToGroup = (req,res) => {
  let userIdToAddGroup = req.params.userIdToAddGroup;
  let groupId = req.params.groupId;
  let userAddMemberId = req.session.user.userId;

  group.addMemberToGroup(userAddMemberId,userIdToAddGroup,groupId);
}

let searchMemberToAddGroup = async (req,res) => {
  try {
    let keyWords = req.body.keyWords;
    let searcherId = req.session.user.userId;
    let skip = skip = Number(req.body.skip);
    let groupId = req.body.groupId;
  
    await socketValid.validUserName(keyWords);
    if(keyWords.length > 30) return res.status(500).send();

    let resultSearch = await group.searchMemberToAddGroup(searcherId,keyWords,skip,groupId);

    return res.status(200).send(resultSearch)
  } catch (error) {
    return res.status(500).send();
  }
}

module.exports = {
  createNewGroup: createNewGroup,
  checkIsAdmin: checkIsAdmin,
  getGroupInformation: getGroupInformation,
  leaveGroupChat: leaveGroupChat,
  addMemberToGroup: addMemberToGroup,
  searchMemberToAddGroup: searchMemberToAddGroup
}