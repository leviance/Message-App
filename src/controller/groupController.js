import {group} from '../services/index';
import {groupValid} from '../validation/index';

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

module.exports = {
  createNewGroup: createNewGroup
}