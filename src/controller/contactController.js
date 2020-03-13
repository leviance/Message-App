import {contact} from '../services/index';

let sendRequestContact = (req, res) => {
  let senderId = req.session.user.userId;
  let receiverId = req.params.userId;

  contact.sendRequestContact(senderId, receiverId);
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

module.exports = {
  sendRequestContact: sendRequestContact,
  searchFriends: searchFriends
}