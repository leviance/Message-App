import {emitSocket} from '../../helper/helperSocket';
import GroupModel from '../../models/groupModel';
import UserModel from '../../models/userModel';
import Notification from '../../models/notificationModel';
import {groupAction} from '../../../lang/vi';

let leaveGroupChat = (io) => {
  io.on('connection', socket => {
    socket.on('member-leave-group-chat', async (data) => {
      
      try {
        // create notification
        let groupInfo = await GroupModel.getGroupUsers(data.receiverId);
        let userInfo = await UserModel.inforUser(data.senderId);
        let notification = {};

        for(let i = 0; i < groupInfo.members.length; i++) {
          notification = {
            senderNotif:{
              id: userInfo._id,
              username: userInfo.username,
              avatar: userInfo.avatar
            },
            receiverNotif:{
              id: groupInfo.members[i],
            },
            content: groupAction.leaveGroupChat(userInfo.username,groupInfo.groupName),
            typeNotif: "leaveGroup"
          }

          let dataNotif = await Notification.createNew(notification);
          notification = {};

          let dataToEmit = {
            receiverId: groupInfo.members[i],
            notifId: dataNotif._id,
            avatar: userInfo.avatar,
            username: userInfo.username,
            groupName: groupInfo.groupName,
            senderId: data.senderId
          }

          emitSocket("response-member-leave-group-chat",dataToEmit,io);
        }
       
      } catch (error) {
        // trường hợp này sẽ xảy ra nếu có người cố tình sửa thông tin thành mã độc
      }

    })
  })
}

module.exports = leaveGroupChat;