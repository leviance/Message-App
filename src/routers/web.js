import express from 'express';
import {auth,home,contact,user,notif} from '../controller/index';
import {authValid} from '../validation/index';
import passport from 'passport';

import initPassportFacebook from '../controller/loginWithApp/loginFacebook';
import initPassportGoogle from '../controller/loginWithApp/loginGoogle';

initPassportFacebook();
initPassportGoogle();

const router = express.Router();

let initRouters = (app) => {

  // request from page login
  router.post("/create-new-account",authValid.checkRegister,auth.createNewAccount);

  router.get("/active-account-:nameAccount-:token",auth.activeAccount);

  router.get("/request-login/:nameAccount-:password",authValid.checkLogin,auth.userLogin);

  router.get("/login", auth.checkLogedOut);

  router.get("/auth/facebook", passport.authenticate("facebook"));
  router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/", 
    failureRedirect: "/login"
  }));

  router.get('/auth/google',passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ] }));
  router.get('/auth/google/callback', 
  passport.authenticate('google', { 
    successRedirect: "/", 
    failureRedirect: '/login' 
  }));


  //router.get("*", (req, res) => { res.redirect("/login"); });

  // request from home page
  router.get("/", home);
  
  router.get("/logout",user.userLogOut);
  router.post("/update-user-infor",user.updateUserInfor);
  router.post("/user-update-password",user.updateUserPassword);

  router.post("/search-friends",contact.searchFriends);
  router.put("/cancel-request-contact-send-:receiverId",contact.cancelReqContactSend);

  router.post("/send-request-contact-:userId",contact.sendRequestContact);
  router.post("/accept-contact-:targetId",contact.acceptContact);

  router.post("/list-notification-viewed",notif.notificationViewed);
  router.post("/read-more-notifications",notif.readMoreNotifications);
  router.put("/remove-all-notifications-:targetId",notif.removeAllNotifications);

  router.get("/view-user-information-:userId",user.getUserInformation);

  return app.use("/", router);
}

module.exports = initRouters;