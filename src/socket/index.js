import addNewContact from './contactSocket/addNewContact';
import {userSocket} from './userSocket/userSocket';
import acceptContact from './contactSocket/acceptContact'

let initSocket = (io) => {
  addNewContact(io);
  userSocket(io);
  acceptContact(io);
}

module.exports = initSocket;