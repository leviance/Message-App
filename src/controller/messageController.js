import {message} from '../services/index';
import {socketValid} from '../validation/index';

let getMessages = async (req, res) => {
  let senderMessId = req.session.user.userId;
  let receiverMessId = req.body.receiverMessId;
  let type = req.body.type;

  let testId = new RegExp(/^[0-9a-zA-Z]+$/);
  if(!testId.test(receiverMessId)) return res.status(500).send();

  if(type !== "chat-personal" && type !== "chat-group") return res.status(500).send();
  
  let returnMess = await message.getMessages(senderMessId, receiverMessId, type);

  return res.status(200).send(returnMess);
}

let sendMess = async (req, res) => {
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

    message.sendMess(sender,receiver,messageToSend);

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  getMessages: getMessages,
  sendMess: sendMess
}