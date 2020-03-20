import {emitSocket} from '../../helper/helperSocket';
import {socketValid} from '../../validation/index';

let createNewGroup = (io) => {
  io.on('connection', socket => {
    socket.on('create-new-group', async (data) => {
      
      try {
        // valid data
        await socketValid.validUserId(data.userCreateGroupId);
        await socketValid.validUserId(data.groupId);
        for(let i = 0; i < data.members.length; i++) {
          await socketValid.validUserId(data.members[i]);
        }
        await socketValid.validAvatar(data.avatar);
        await socketValid.validUserName(data.groupName);
        await socketValid.validUserName(data.description);

        let dataToEmit = {
          avatar: data.avatar,
          groupName: data.groupName,
          groupId: data.groupId,
          description: data.description
        }
       
        data.members.forEach( receiverId =>{
          dataToEmit.receiverId = receiverId;

          emitSocket("response-create-new-group",dataToEmit,io);
        })
        

      } catch (error) {
        // trường hợp này sẽ xảy ra nếu có người cố tình sửa thông tin thành mã độc
      }

    })
  })
}

module.exports = createNewGroup;