import express from 'express';
import {auth,home} from '../controller/index';
import {authValid} from '../validation/index';
import passport from 'passport';
import initPassportFacebook from '../controller/loginWithApp/loginFacebook';

initPassportFacebook();

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
  }))

  //router.get("*", (req, res) => { res.redirect("/login"); });

  // request from home page
  router.get("/", auth.checkLogedin);
  router.get("/logout",home.userLogOut);

  router.post("/search-friends",home.searchFriends);

  router.post("/update-user-infor",home.updateUserInfor);

  return app.use("/", router);
}

module.exports = initRouters;