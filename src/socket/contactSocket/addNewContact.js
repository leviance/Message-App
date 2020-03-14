import {emitSocket} from '../../helper/helperSocket';

let addNewContact = (io) => {
  io.on('connection', socket => {
    socket.on('sent-request-add-friend', data => {
      //console.log(data.receiverId);
      emitSocket("receive-request-add-friend",data,io);
    })
  })
}

module.exports = addNewContact;