import addNewContact from './contactSocket/addNewContact';
import {userSocket} from './userSocket/userSocket';
import acceptContact from './contactSocket/acceptContact';
import cancelReqContactSend from './contactSocket/cancelReqContactSend';
import createNewGroup from './groupSocket/createNewGroup';

let initSocket = (io) => {
  addNewContact(io);
  userSocket(io);
  acceptContact(io);
  cancelReqContactSend(io);
  createNewGroup(io);
}

module.exports = initSocket;