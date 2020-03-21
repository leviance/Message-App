import addNewContact from './contactSocket/addNewContact';
import {userSocket} from './userSocket/userSocket';
import acceptContact from './contactSocket/acceptContact';
import cancelReqContactSend from './contactSocket/cancelReqContactSend';
import createNewGroup from './groupSocket/createNewGroup';
import sendMessageText from './messageSocket/sendMessageText';

let initSocket = (io) => {
  addNewContact(io);
  userSocket(io);
  acceptContact(io);
  cancelReqContactSend(io);
  createNewGroup(io);
  sendMessageText(io);
}

module.exports = initSocket;