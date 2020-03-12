import {contact} from '../services/index'

let sendRequestContact = (req, res) => {
  let senderId = req.session.user.userId;
  let receiverId = req.params.userId;

  contact.sendRequestContact(senderId, receiverId);
}

module.exports = {
  sendRequestContact: sendRequestContact
}