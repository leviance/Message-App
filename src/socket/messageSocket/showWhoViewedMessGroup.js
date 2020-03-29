import {emitSocket} from '../../helper/helperSocket';
import GroupModel from "../../models/groupModel";

let showWhoViewedMessGroup = (io) => {
  io.on('connection', socket => {
    socket.on('show-who-viewed-mess-group', async (data) => {
      
      let getIdMembersOfGroup = await GroupModel.getGroupUsers(data.receiverId);
      
       data.groupId = data.receiverId;

      let listIdMembersToSendSocket = getIdMembersOfGroup.members;
  
      listIdMembersToSendSocket.forEach( memberId => {
        data.receiverId = memberId;
        emitSocket("response-show-who-viewed-mess-group",data,io);
      })

    })
  })
}

module.exports = showWhoViewedMessGroup;