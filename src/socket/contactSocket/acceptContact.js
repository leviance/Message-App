import {emitSocket} from '../../helper/helperSocket';
import {socketValid} from '../../validation/index';

let acceptContact = (io) => {
  io.on('connection', socket => {
    socket.on('accept-contact', async (data) => {
      try {
        // valid data
        await socketValid.acceptContactValid(data);
        //console.log(data.receiverId);
        emitSocket("response-accept-contact",data,io);

      } catch (error) {
        // trường hợp này sẽ xảy ra nếu có người cố tình sửa thông tin thành mã độc
      }

    })
  })
}

module.exports = acceptContact;