import {listSocket} from '../socket/userSocket/userSocket';

let emitSocket = (eventName,data,io) => {
  let receiverId = data.receiverId;

  listSocket[receiverId].forEach( socketId => {
    io.sockets.connected[socketId].emit(eventName,data);
  })

}

module.exports.emitSocket = emitSocket;