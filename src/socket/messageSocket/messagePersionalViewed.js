import {emitSocket} from '../../helper/helperSocket';

let messagePersionalViewed = (io) => {
  io.on('connection', socket => {
    socket.on('message-persional-viewed', async (data) => {
      console.log(data);
      emitSocket("response-message-persional-viewed",data,io);
    })
  })
}

module.exports = messagePersionalViewed;