import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const LIMIT_FRIENDS_TEKEN = 20;
const saltRounds = 12;

let updateUserInfor = async (userId,inforToUpdate) =>{
  return new Promise( async (resolve, reject) => {
    let result = await UserModel.updateUserInfor(userId,inforToUpdate);
    return resolve(result);
  })
}

let updateUserPassword = async (userId,newPassword) =>{
  return new Promise( async (resolve, reject) =>{
    // hash password
    let hash = await bcrypt.hash(newPassword, saltRounds)
    let dataToUpdate = {
      local : {
        password: hash,
        isActive: true,
        veryfyToken: null
      }
    }

    await UserModel.updateData(userId,dataToUpdate);
    
    return resolve();

  })
}

let getUserInformation = (userId) => {
  return new Promise( async (resolve, reject) =>{
    let userInfo = await UserModel.inforUser(userId);

    return resolve(userInfo);
  });

}

let searchFriendsToAddGroup = (searcherId,listUserIdAdded,keyWords,skip) => {
  return new Promise( async (resolve, reject) => {

    let listFriends = await ContactModel.findUserById(searcherId);

    if(listFriends.length === 0) return reject();

    let listFriendsId = [];
    listFriends.forEach( friend => {
      listFriendsId.push(friend.senderId);
      listFriendsId.push(friend.receiverId);
    });

    _.remove(listFriendsId, function(id) {
      return id  == searcherId;
    });

    let inforUser = await UserModel.searchFriendsToAddGroup(listFriendsId,listUserIdAdded,keyWords,LIMIT_FRIENDS_TEKEN,skip);

    return resolve(inforUser);
  })
}

module.exports = {
  updateUserInfor: updateUserInfor,
  updateUserPassword: updateUserPassword,
  getUserInformation: getUserInformation,
  searchFriendsToAddGroup: searchFriendsToAddGroup
}