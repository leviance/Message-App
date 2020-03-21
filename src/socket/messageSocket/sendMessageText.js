import {emitSocket} from '../../helper/helperSocket';
import {socketValid} from '../../validation/index';

let sendMessageText = (io) => {
  io.on('connection', socket => {
    socket.on('send-message-text', async (data) => {
      
      try {
        // valid data
        await socketValid.validUserId(data.senderId);
        await socketValid.validUserId(data.receiverId);
        
        await socketValid.validAvatar(data.avatar);
        await socketValid.validUserName(data.username);

        emitSocket("response-send-message-text",data,io);
       
      } catch (error) {
        // trường hợp này sẽ xảy ra nếu có người cố tình sửa thông tin thành mã độc
      }

    })
  })
}

module.exports = sendMessageText;