import MessageModel from '../models/messageModel';
import ContactModel from '../models/contactModel';
import UserModel from '../models/userModel';
import GroupModel from '../models/groupModel';

import _ from 'lodash';

const LIMIT_MESSAGES_TAKEN = 15;

let getMessages = (senderMessId, receiverMessId, type) => {
  return new Promise( async (resolve, reject) => {
    let messages = await MessageModel.findMessages(senderMessId, receiverMessId,LIMIT_MESSAGES_TAKEN);
    
    _.reverse(messages);

    return resolve(messages); 
  })

}

let sendPersonalMess = (sender,receiver,message) => {
    MessageModel.sendMess(sender,receiver,message); 
    // thêm trường update cho con tắc 
    // nếu có updatedAt có nghĩa là 2 người này có nhắn tin với nhau
    ContactModel.chatTogether(sender.id,receiver.id);
    
}

let sendGroupMess = (sender,receiver,message) => {
  MessageModel.sendMess(sender,receiver,message); 
  // thêm trường update cho contact

  // + 1 vào messageAmount 
  GroupModel.updateMessAmount(receiver.id);

  // có updatedAt là có trò truyện với nhau
  GroupModel.chatTogether(receiver.id);

  // lấy về danh sách id những người có trong group để client gửi socket 
  return new Promise( async (resolve, reject) => {
    let listUserIdReceiveMessInGroup = GroupModel.getGroupUsers(receiver.id);

    if(listUserIdReceiveMessInGroup.length === 0) return reject();

    return resolve(listUserIdReceiveMessInGroup);
  })
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

    let listConversations = [];
    let inforUser;
    let contactUpdatedAt;

    for(let i = 0; i < listContactHaveMessId.length; i++){
      let message = await MessageModel.findMessages(userId,listContactHaveMessId[i],1);
      
      // find infor user
      if(message[0].sender.id !== userId){
        inforUser = await UserModel.inforUser(message[0].sender.id);
      }
      else{
        inforUser = await UserModel.inforUser(message[0].receiver.id);
      }

      // find contact updatedAt
      contactUpdatedAt = await ContactModel.inforForGetConversation(userId,listContactHaveMessId[i]);
      
      if(message.length === 0) return resolve([]);

      if(message[0].text){
        listConversations[i] = {
          username: inforUser.username,
          avatar: inforUser.avatar,
          id: inforUser._id,
          messageText: message[0].text,
          updatedAt: contactUpdatedAt.updatedAt
        }
      }

      if(message[0].file){
        listConversations[i] = {
          username: inforUser.username,
          avatar: inforUser.avatar,
          id: inforUser._id,
          messageFile: message[0].file,
          updatedAt: contactUpdatedAt.updatedAt
        }
      }

      if(message[0].img){
        listConversations[i] = {
          username: inforUser.username,
          avatar: inforUser.avatar,
          id: inforUser._id,
          messageImg: message[0].img,
          updatedAt: contactUpdatedAt.updatedAt
        }
      }
    }

    return resolve(listConversations);

  })
}

let getMessagesGroup = (receiverMessId) => {
  return new Promise( async (resolve, reject) => {

    // receiverMessId is id of group chat
    let messages = await MessageModel.findGroupMessages(receiverMessId,LIMIT_MESSAGES_TAKEN);
    
    _.reverse(messages);

    return resolve(messages); 
  })
}

let numberMessagesUnRead = (senderMessId, receiverMessId, type) => {
  return new Promise( async (resolve, reject) => {
    // lấy ra số messages chưa xem 
    let amountMessUnRead = 0;

    if(type === "chat-group") {
      // senderMessId là id của group | receiverMessId là id của người lấy số tin nhắn chưa xem
      amountMessUnRead = await MessageModel.findMessagesGroupUnRead(senderMessId, receiverMessId); 
      amountMessUnRead = amountMessUnRead.length;
      return resolve(amountMessUnRead);
    }

    amountMessUnRead = await MessageModel.findMessagesUnRead(senderMessId, receiverMessId);
    amountMessUnRead = amountMessUnRead.length;
    return resolve(amountMessUnRead);
    

    
  })


}

module.exports = {
  getMessages: getMessages,
  sendPersonalMess: sendPersonalMess,
  getListConversations: getListConversations,
  getMessagesGroup: getMessagesGroup,
  sendGroupMess: sendGroupMess,
  numberMessagesUnRead: numberMessagesUnRead
}
