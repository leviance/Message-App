import UserModel from '../models/userModel';
import regularExpressions from '../regularExpressions/index';
import bcrypt from 'bcrypt';
import ContactModel from '../models/contactModel';
import _ from 'lodash';

const saltRounds = 12;

let searchFriends = (userName,limit,senderId) => {
  return new Promise( async (resolve, reject) => {

    // regular expression for search friends 
    let regex = regularExpressions.regexSearchFriends(userName);

    // tìm trong danh sách contact những người có contact với mình 
    let deprecatedUserId = await ContactModel.findUserById(senderId);

    let listdeprecatedUserId = [];

    // gắn nó những contact có mình vào một mảng
    deprecatedUserId.forEach(user =>{
      listdeprecatedUserId.push(user.senderId);
      listdeprecatedUserId.push(user.receiverId);
    });

    // lọc loại bỏ id lặp lại của chính mình
    listdeprecatedUserId = _.uniq(listdeprecatedUserId);

    // tìm những người không có id trong listdeprecatedUserId
    searchFriends = await UserModel.searchFriends(userName,regex,limit,listdeprecatedUserId);
    
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