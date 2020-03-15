import UserModel from '../models/userModel';
import regularExpressions from '../regularExpressions/index';

import ContactModel from '../models/contactModel';
import _ from 'lodash';

const LIMIT_REQUEST_CONTACT_SEND_TEKEN = 12;
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
    let listReceiverId = [];
    result.forEach(user =>{
      listReceiverId.push(user.receiverId);
    })

    // find user Receive
    let inforUserReceiveContact = [];
    for(let i = 0 ; i < listReceiverId.length ; i ++){
      let result =  await UserModel.inforUser(listReceiverId[i]);
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

    listdeprecatedUserId.push(senderId);
    // tìm những người không có id trong listdeprecatedUserId
    
    searchFriends = await UserModel.searchFriends(userName,regex,LIMIT_FRIENDS_TEKEN,listdeprecatedUserId);
    
    if(searchFriends.length === 0) {
      return reject(searchFriends);
    }
    
    return resolve(searchFriends);
  })
}

let getListReqContactReceived = (userId) => {
  return new Promise( async (resolve, reject) => {
    let result = await ContactModel.getListReqContactReceived(userId,LIMIT_REQUEST_CONTACT_SEND_TEKEN);

    if(result === null) return resolve(result);

    // get id user received
    let listSenderId = [];
    result.forEach(user =>{
      listSenderId.push(user.senderId);
    })
    // find user Receive
      let listInforSender =  await UserModel.listInForUser(listSenderId);
      
    return resolve(listInforSender);
  })
}

let acceptContact = (targetId, receiverId) =>{
   ContactModel.acceptContact(targetId,receiverId);
}

module.exports = {
  sendRequestContact: sendRequestContact,
  getListReqContactSend: getListReqContactSend,
  searchFriends: searchFriends,
  getListReqContactReceived: getListReqContactReceived,
  acceptContact: acceptContact
}