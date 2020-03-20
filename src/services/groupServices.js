import GroupModel from '../models/groupModel';
import {groupValid} from '../validation/index';

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

module.exports = {
  createNewGroup: createNewGroup,
  getListChatGoupMess: getListChatGoupMess
}