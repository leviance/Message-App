import MessageModel from '../models/messageModel';

const LIMIT_MESSAGES_TAKEN = 15;

let getMessages = (senderMessId, receiverMessId, type) => {
  return new Promise( async (resolve, reject) => {
    let messages = await MessageModel.findMessages(senderMessId, receiverMessId,LIMIT_MESSAGES_TAKEN);
 
    return resolve(messages); 
  })

}

let sendPersonalMess = (sender,receiver,message) => {
    MessageModel.sendPersonalMess(sender,receiver,message); 
}

module.exports = {
  getMessages: getMessages,
  sendPersonalMess: sendPersonalMess
}
