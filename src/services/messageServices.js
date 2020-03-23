import MessageModel from '../models/messageModel';
import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';

import _ from 'lodash';

const LIMIT_MESSAGES_TAKEN = 15;

let getMessages = (senderMessId, receiverMessId, type) => {
  return new Promise( async (resolve, reject) => {
    let messages = await MessageModel.findMessages(senderMessId, receiverMessId,LIMIT_MESSAGES_TAKEN);
    
    _.reverse(messages);

    return resolve(messages); 
  })

}

let sendMess = (sender,receiver,message) => {
    MessageModel.sendMess(sender,receiver,message); 

    // thêm trường update cho con tắc 
    // nếu có updatedAt có nghĩa là 2 người này có nhắn tin với nhau
    ContactModel.chatTogether(sender.id,receiver.id);
}

let getListConversations = (userId) => {
  return new Promise( async (resolve, reject) => {
    let listContactHaveMess = await ContactModel.listContactHaveMess(userId);
    
    if(listContactHaveMess.length === 0) return resolve([]);

    // lấy những contact có updatedAt tức là đã nhăn tin với nhau
    let listContactHaveMessId = [];
    listContactHaveMess.forEach(contact => {
      listContactHaveMessId.push(contact.senderId);
      listContactHaveMessId.push(contact.receiverId);
    });

    // loại bỏ id của chính mình
    _.remove(listContactHaveMessId, function(n) {
      return n  == userId;
    });

    let listInForUsers = await UserModel.listInForUser(listContactHaveMessId);

    let listConversations = [];

    for(let i = 0; i < listContactHaveMessId.length; i++){
      let message = await MessageModel.findMessages(userId,listContactHaveMessId[i],1);
      
      if(message.length === 0) return resolve([]);

      if(message[0].text){
        listConversations[i] = {
          username: listInForUsers[i].username,
          avatar: listInForUsers[i].avatar,
          id: listInForUsers[i]._id,
          messageText: message[0].text,
          updatedAt: listContactHaveMess[i].updatedAt
        }
      }

      if(message[0].file){
        listConversations[i] = {
          username: listInForUsers[i].username,
          avatar: listInForUsers[i].avatar,
          id: listInForUsers[i]._id,
          messageFile: message[0].file,
          updatedAt: listContactHaveMess[i].updatedAt
        }
      }

      if(message[0].img){
        listConversations[i] = {
          username: listInForUsers[i].username,
          avatar: listInForUsers[i].avatar,
          id: listInForUsers[i]._id,
          messageImg: message[0].img,
          updatedAt: listContactHaveMess[i].updatedAt
        }
      }
    }

    return resolve(listConversations);

  })
}

module.exports = {
  getMessages: getMessages,
  sendMess: sendMess,
  getListConversations: getListConversations
}
