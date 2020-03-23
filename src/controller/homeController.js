import {home,contact,auth,notification,group,message} from '../services/index';
import _ from 'lodash';

let homeController = async (req, res) => {
  // go home page
  if(req.session.user || req.session.passport){
    // đặt lại session thành chuẩn chung thay cho session passport
    if(req.session.passport){
      let userSession = {
        userId: req.session.passport.user.userId
      }
      req.session.user = userSession;
    }

    let userInfo = await auth.inforUser(req.session.user.userId);
    let listReqContactSend = await contact.getListReqContactSend(req.session.user.userId);
    let listReqContactReceived = await contact.getListReqContactReceived(req.session.user.userId);
    let listNotifications = await notification.getListNotifications(req.session.user.userId);
    let listChatGoupMess = await group.getListChatGoupMess(req.session.user.userId);
    let listFriends = await contact.getListFriends(req.session.user.userId);
    let listConversations = await message.getListConversations(req.session.user.userId);

    console.log(listConversations);
    console.log('jajaj');
    console.log(listChatGoupMess);
    //  sort conversations 
    let conversations = [];
    
    if(listChatGoupMess.length > 0){
      listChatGoupMess.forEach( conversion =>{
        conversations.push(conversion);
      });
    }

    if(listConversations.length > 0){
      listConversations.forEach( conversion =>{
        conversations.push(conversion);
      });
    }
    

    _.sortBy(conversations, ['updatedAt']);
    _.reverse(conversations);
    //console.log(conversations)

    return res.render("main/layout/home",{
      user : userInfo,
      listReqContactSend: listReqContactSend,
      listReqContactReceived: listReqContactReceived,
      listNotifications: listNotifications,
      listFriends: listFriends,
      conversations: conversations
    });
  }

  // go login page
  res.redirect("/login");
}


module.exports.homeController = homeController;

