import {emitSocket} from '../../helper/helperSocket';
import {socketValid} from '../../validation/index';

let cancelReqContactSend = (io) => {
  io.on('connection', socket => {
    socket.on('cancel-req-contact', async (data) => {
      try {
        // valid data
        await socketValid.acceptContactValid(data);
        //console.log(data.receiverId);
        emitSocket("response-cancel-req-contact",data,io);

      } catch (error) {
        // trường hợp này sẽ xảy ra nếu có người cố tình sửa thông tin thành mã độc
      }

    })
  })
}

module.exports = cancelReqContactSend;