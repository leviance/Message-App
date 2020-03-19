import GroupModel from '../models/groupModel';
import {groupValid} from '../validation/index';

let createNewGroup = (userCreatedId,listUserIdToCreateGroup,groupName,description,userAmount) => {
  return new Promise( async (resolve, reject) => {
    // Check mỗi người chỉ được tạo tối đa 10 nhóm 
    let amountGroupThisUserCreated = await GroupModel.findByUserCreatedId(userCreatedId);

    if(amountGroupThisUserCreated.length > 10) return reject(groupValid.exeededGroupAllow);

    await GroupModel.createNewGroup(userCreatedId,listUserIdToCreateGroup,groupName,description,userAmount);

    return resolve();
  })
}

module.exports = {
  createNewGroup: createNewGroup
}