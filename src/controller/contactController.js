import {contact} from '../services/index';

let sendRequestContact = async (req, res) => {
  let senderId = req.session.user.userId;
  let receiverId = req.params.userId;

  let Notif = await contact.sendRequestContact(senderId, receiverId);

  return res.status(200).send(Notif);
}

let searchFriends = async (req,res) => {
  let userName = req.body.userName;
  let senderId = req.session.user.userId;

  try {
    let searchResults = await contact.searchFriends(userName,senderId);

    return res.status(200).send(searchResults);
  } catch (error) {
    return res.status(500).send(error);
  }
}

let acceptContact = async (req, res) => {
  let senderId = req.params.targetId;
  let receiverId = req.session.user.userId;
  
  let Notif = await contact.acceptContact(senderId,receiverId);

  return res.status(200).send(Notif);
}

let cancelReqContactSend = (req, res) =>{
  let receiverId = req.params.receiverId;
  let senderId = req.session.user.userId;
  contact.cancelReqContactSend(senderId,receiverId);
}

module.exports = {
  sendRequestContact: sendRequestContact,
  searchFriends: searchFriends,
  acceptContact: acceptContact,
  cancelReqContactSend: cancelReqContactSend
}