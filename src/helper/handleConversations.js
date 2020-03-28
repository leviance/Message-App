import {message} from '../services/index';

let handle = (listChatGoupMess,listConversations, receiverMessId) => {
  return new Promise( async (resolve, reject) => {
    
    let listConversationsToReturn = [];
    let conversation = {};

    let numberOfConversations = listChatGoupMess.concat(listConversations);

    for(let i = 0; i < numberOfConversations.length; i++) {
      if(numberOfConversations[i].groupName){
        conversation.messageAmount = numberOfConversations[i].messageAmount;
        conversation.avatar = numberOfConversations[i].avatar;
        conversation.members = numberOfConversations[i].members;
        conversation.removedAt = numberOfConversations[i].removedAt;
        conversation._id = numberOfConversations[i]._id;
        conversation.userCreatedId = numberOfConversations[i].userCreatedId;
        conversation.groupName = numberOfConversations[i].groupName;
        conversation.description = numberOfConversations[i].description;
        conversation.userAmount = numberOfConversations[i].userAmount;
        conversation.createdAt = numberOfConversations[i].createdAt;
        conversation.updatedAt = numberOfConversations[i].updatedAt;
        conversation.messageUnRead = await message.numberMessagesUnRead(numberOfConversations[i]._id, receiverMessId,"chat-group");
        
      }
      else{
        conversation.username = numberOfConversations[i].username;
        conversation.avatar = numberOfConversations[i].avatar;
        conversation.id = numberOfConversations[i].id;
        conversation.messageText = numberOfConversations[i].messageText;
        conversation.updatedAt = numberOfConversations[i].updatedAt;
        conversation.messageUnRead = await message.numberMessagesUnRead(numberOfConversations[i].id, receiverMessId,"chat-personal");
      }

      listConversationsToReturn.push(conversation);
      conversation = {};
    }

    return resolve(listConversationsToReturn);

   // lấy số lượng tin nhắn chưa đọc
    //let numberMessagesUnRead = await message.numberMessagesUnRead(senderMessId, receiverMessId, type);
  })
}

module.exports.handleConversations = handle;