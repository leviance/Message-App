import {emitSocket} from '../../helper/helperSocket';
import {socketValid} from '../../validation/index';

let sendGroupMessageText = (io) => {
  io.on('connection', socket => {
    socket.on('send-group-message-text', async (data) => {
      
      try {
        // valid data
        await socketValid.validUserId(data.senderId);

        for(let i = 0 ; i < data.receiverId.length ; i++) {
          await socketValid.validUserId(data.receiverId[i]);
        }
        
        await socketValid.validAvatar(data.avatar);
        await socketValid.validUserName(data.username);

        data.receiverId.forEach( receiverId => {
          data.receiverId = receiverId;
          emitSocket("response-send-group-message-text",data,io);
        })
        
       
      } catch (error) {
        // trường hợp này sẽ xảy ra nếu có người cố tình sửa thông tin thành mã độc
      }

    })
  })
}

module.exports = sendGroupMessageText;