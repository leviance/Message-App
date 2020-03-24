import UserModel from '../models/userModel';
import regularExpressions from '../regularExpressions/index';

import ContactModel from '../models/contactModel';
import _ from 'lodash';

import Notification from '../models/notificationModel';
import {notificationContent} from '../../lang/vi';
import {notificationType} from '../../lang/vi';



const LIMIT_REQUEST_CONTACT_SEND_TEKEN = 12;
const LIMIT_FRIENDS_TEKEN = 10;


let sendRequestContact = (senderId,receiverId) =>{
  return new Promise( async  (resolve, reject) => {
  let checkContactExist = await ContactModel.findContact(senderId,receiverId);

  if(checkContactExist === null){
    
      await ContactModel.createNew(senderId,receiverId);
      // create notification
      let inforSender = await UserModel.inforUser(senderId);
      let inforReceiver = await UserModel.inforUser(receiverId);

      let contentNotif = notificationContent.requestContact(inforSender.username);
      let typeNotif = notificationType.requestContact;

      let notification = {
        senderNotif:{
          id: inforSender._id,
          username: inforSender.username,
          avatar: inforSender.avatar
        },
        receiverNotif:{
          id: inforReceiver._id,
          username: inforReceiver.username,
          avatar: inforReceiver.avatar
        },
        content: contentNotif,
        typeNotif: typeNotif
      }

      let Notif = await Notification.createNew(notification);

      return resolve(Notif)
   
  }
});
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

let acceptContact = (senderId, receiverId) =>{
   return new Promise( async (resolve, reject) => {
    ContactModel.acceptContact(senderId,receiverId);

    // create notification
    let inforSender = await UserModel.inforUser(senderId);
    let inforReceiver = await UserModel.inforUser(receiverId);
 
    let contentNotif = notificationContent.acceptContact(inforReceiver.username);
    let typeNotif = notificationType.acceptContact;
 
    let notification = {
      senderNotif:{
       id: inforReceiver._id,
       username: inforReceiver.username,
       avatar: inforReceiver.avatar
      },
      receiverNotif:{
       id: inforSender._id,
       username: inforSender.username,
       avatar: inforSender.avatar
      },
      content: contentNotif,
      typeNotif: typeNotif
    }
 
    let Notif = Notification.createNew(notification);

    return resolve(Notif);
   })
}

let cancelReqContactSend = (senderId,receiverId) => {
  
  ContactModel.cancelReqContactSend(senderId,receiverId);
}

let notAcceptMakeFriend = (senderReqId,receiverReqId) => {
  ContactModel.removeContact(senderReqId,receiverReqId)
}

let readMoreReqSend = (senderReqId,skip) => {
 
  return new Promise( async (resolve, reject) => {
    skip = Number(skip);
    let listContacts = await ContactModel.readMoreReqSend(senderReqId,skip,LIMIT_REQUEST_CONTACT_SEND_TEKEN);

    if(listContacts.length === 0) return reject();

    let listIdToGetInfor = [];

    listContacts.forEach( contact => { 
      listIdToGetInfor.push(contact.receiverId);
    })

    let listInforReceiver = await UserModel.listInForUser(listIdToGetInfor);

    return resolve(listInforReceiver);

  })
}

let readMoreReqReceived = (receivedId,skip) => {
 
  return new Promise( async (resolve, reject) => {
    skip = Number(skip);
    let listContacts = await ContactModel.readMoreReqReceived(receivedId,skip,LIMIT_REQUEST_CONTACT_SEND_TEKEN);

    if(listContacts.length === 0) return reject();

    let listIdToGetInfor = [];

    listContacts.forEach( contact => { 
      listIdToGetInfor.push(contact.senderId);
    })

    let listInforReceiver = await UserModel.listInForUser(listIdToGetInfor);

    return resolve(listInforReceiver);

  })
}

let getListFriends = (userId) => {
  return new Promise( async (resolve, reject) => {
    let listContacts = await ContactModel.findFriends(userId);
    
    let listID = [];
    listContacts.forEach( contact => {
      listID.push(contact.senderId);
      listID.push(contact.receiverId);
    });

    _.remove(listID, function(n) {
      return n  == userId;
    });

    let listFriends = await UserModel.listInForUser(listID);

    return resolve(listFriends);

  });
}

module.exports = {
  sendRequestContact: sendRequestContact,
  getListReqContactSend: getListReqContactSend,
  searchFriends: searchFriends,
  getListReqContactReceived: getListReqContactReceived,
  acceptContact: acceptContact,
  cancelReqContactSend: cancelReqContactSend,
  notAcceptMakeFriend: notAcceptMakeFriend,
  readMoreReqSend: readMoreReqSend,
  readMoreReqReceived: readMoreReqReceived,
  getListFriends: getListFriends
}