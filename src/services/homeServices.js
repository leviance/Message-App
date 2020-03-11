import UserModel from '../models/userModel';
import regularExpressions from '../regularExpressions/index';
import bcrypt from 'bcrypt';

const saltRounds = 12;

let searchFriends = (userName,limit) => {
  return new Promise( async (resolve, reject) => {
    // regular expression for search friends 
    let regex = regularExpressions.regexSearchFriends(userName);

    searchFriends = await UserModel.searchFriends(userName,regex,limit);

    if(searchFriends.length === 0) {
      return reject(searchFriends);
    }
    return resolve(searchFriends);
  })
}

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

module.exports = {
  searchFriends: searchFriends,
  updateUserInfor: updateUserInfor,
  updateUserPassword: updateUserPassword
}