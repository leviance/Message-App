import UserModel from '../models/userModel';
import regularExpressions from '../regularExpressions/index';

import ContactModel from '../models/contactModel';
import _ from 'lodash';

const LIMIT_REQUEST_CONTACT_SEND_TEKEN = 20;
const LIMIT_FRIENDS_TEKEN = 10;


let sendRequestContact = async (senderId,receiverId) =>{
  let checkContactExist = await ContactModel.findContact(senderId,receiverId);

  if(checkContactExist === null){
    ContactModel.createNew(senderId,receiverId);
  }
  
}

let getListReqContactSend = (userId) => {
  return new Promise( async (resolve, reject) => {
    let result = await ContactModel.getListReqContactSend(userId,LIMIT_REQUEST_CONTACT_SEND_TEKEN);

    if(result === null) return resolve(result);

    // get id user received
    let userReceiverId = [];
    result.forEach(user =>{
      userReceiverId.push(user.receiverId);
    })

    // find user Receive
    let inforUserReceiveContact = [];
    for(let i = 0 ; i < userReceiverId.length ; i ++){
      let result =  await UserModel.inforUser(userReceiverId[i]);
      inforUserReceiveContact.push(result);
    }
   

    return resolve(inforUserReceiveContact);
  })
}

let searchFriends = (userName,senderId) => {
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
    
    searchFriends = await UserModel.searchFriends(userName,regex,LIMIT_FRIENDS_TEKEN,listdeprecatedUserId);
    
    if(searchFriends.length === 0) {
      return reject(searchFriends);
    }
    
    return resolve(searchFriends);
  })
}

module.exports = {
  sendRequestContact: sendRequestContact,
  getListReqContactSend: getListReqContactSend,
  searchFriends: searchFriends
}