import addNewContact from './contactSocket/addNewContact';
import {userSocket} from './userSocket/userSocket';

let initSocket = (io) => {
  addNewContact(io);
  userSocket(io);
}

module.exports = initSocket;