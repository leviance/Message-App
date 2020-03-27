import {message} from '../services/index';
import {socketValid} from '../validation/index';
import timeSince from '../helper/timeSince';

let getMessages = async (req, res) => {
  let senderMessId = req.session.user.userId;
  let receiverMessId = req.body.receiverMessId;
  let type = req.body.type;

  let testId = new RegExp(/^[0-9a-zA-Z]+$/);
  if(!testId.test(receiverMessId)) return res.status(500).send();

  if(type !== "chat-personal" && type !== "chat-group") return res.status(500).send();
  
  let messageReturn;
  if(type === "chat-personal"){
    messageReturn = await message.getMessages(senderMessId, receiverMessId, type);
  }
  
  if(type === "chat-group"){
    messageReturn = await message.getMessagesGroup(receiverMessId);
  }

   // convert time stamp to human time 
  let messageConvertedTime = [];
  let convertTime = {};
  
  for(let i = 0 ; i< messageReturn.length ; i ++){
    convertTime.sender = messageReturn[i].sender;
    convertTime.receiver = messageReturn[i].receiver;
    convertTime.isRead = messageReturn[i].isRead;
    convertTime.removedAt = messageReturn[i].removedAt;
    convertTime.updatedAt = messageReturn[i].updatedAt;
    convertTime._id = messageReturn[i]._id;
    convertTime.text = messageReturn[i].text;
    convertTime.time = await timeSince(messageReturn[i].createdAt);
    convertTime.type = type;

    messageConvertedTime.push(convertTime);
    convertTime = {};
  }
  
  return res.status(200).send(messageConvertedTime);
}

let sendPersonalMess = async (req, res) => {
  let sender = req.body.sender;
  let receiver = req.body.receiver;
  let messageToSend = req.body.message;
  
  try {
    if(!req.session.user.userId) return res.status(500).send();
    if(req.session.user.userId !== sender.id) return res.status(500).send();
    
    await socketValid.validUserId(sender.id);
    await socketValid.validUserId(receiver.id);
   
    await socketValid.validAvatar(receiver.avatar);
    await socketValid.validAvatar(receiver.avatar);
    
    await socketValid.validUserName(receiver.username);
    await socketValid.validUserName(receiver.username);
 
    message.sendPersonalMess(sender,receiver,messageToSend);
   
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error);
  }
}

let sendGroupMess = async (req, res) => {
  let sender = req.body.sender;
  let receiver = req.body.receiver;
  let messageToSend = req.body.message;
  
  try {
    if(!req.session.user.userId) return res.status(500).send();
    if(req.session.user.userId !== sender.id) return res.status(500).send();
    
    await socketValid.validUserId(sender.id);
    await socketValid.validUserId(receiver.id);
   
    await socketValid.validAvatar(receiver.avatar);
    await socketValid.validAvatar(receiver.avatar);
    
    await socketValid.validUserName(receiver.username);
    await socketValid.validUserName(receiver.username);
 
    let listUserIdReceiveMessInGroup = await message.sendGroupMess(sender,receiver,messageToSend);
   
    return res.status(200).send(listUserIdReceiveMessInGroup);
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  getMessages: getMessages,
  sendPersonalMess: sendPersonalMess,
  sendGroupMess: sendGroupMess
}