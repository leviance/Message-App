import {emitSocket} from '../../helper/helperSocket';
import GroupModel from '../../models/groupModel';
import UserModel from '../../models/userModel';
import Notification from '../../models/notificationModel';
import {groupAction} from '../../../lang/vi';
import _ from 'lodash';

let addMemberToGroupChat = (io) => {
  io.on('connection', socket => {
    socket.on('add-member-to-group-chat', async (data) => {
      try {
        // create notification
        let groupInfo = await GroupModel.getGroupUsers(data.receivedId);
        let userAddedInfo = await UserModel.inforUser(data.userIdToAddGroup);
        let notification = {};
        
        _.remove(groupInfo.members, function(memberId) {
          return memberId == data.senderId;
        });
        // tạo thông báo cho tất cả các thành viên trong nhóm 
        for(let i = 0; i < groupInfo.members.length; i++) {
          notification = {
            senderNotif:{
              id: userAddedInfo._id,
              username: userAddedInfo.username,
              avatar: userAddedInfo.avatar
            },
            receiverNotif:{
              id: groupInfo.members[i],
              username: groupInfo.username
            },
            content: groupAction.addMemberToGroup(data.nameOfUserAddMember,userAddedInfo.username,groupInfo.groupName),
            typeNotif: "addMemberToGroup"
          }

          let dataNotif = await Notification.createNew(notification);
          notification = {};

          let dataToEmit = {
            receiverId: groupInfo.members[i],
            notifId: dataNotif._id,
            avatar: userAddedInfo.avatar,
            username: userAddedInfo.username,
            groupName: groupInfo.groupName,
            nameOfUserAddMember: data.nameOfUserAddMember
          }

          emitSocket("response-add-member-to-group-chat",dataToEmit,io);
        }

        // gửi thông báo cho người được thêm vào nhóm 
        notification = {
          senderNotif:{
            data: data.senderId
          },
          receiverNotif:{
            id: userAddedInfo._id,
            username: userAddedInfo.username,
            avatar: userAddedInfo.avatar
          },
          content: groupAction.newMemberAdded(data.nameOfUserAddMember,groupInfo.groupName),
          typeNotif: "addMemberToGroup"
        }

        let dataNotif = await Notification.createNew(notification);
        let dataToEmit = {
          groupAvatar: groupInfo.avatar,
          groupId: data.receivedId,
          senderId: data.senderId,
          receiverId: userAddedInfo._id,
          notifId: dataNotif._id,
          avatar: userAddedInfo.avatar,
          username: userAddedInfo.username,
          groupName: groupInfo.groupName,
          nameOfUserAddMember: data.nameOfUserAddMember
        }

        emitSocket("response-add-member-to-group-chat",dataToEmit,io);
       
      } catch (error) {
        console.log(error);
      }

    })
  })
}

module.exports = addMemberToGroupChat;