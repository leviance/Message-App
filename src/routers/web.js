import express from 'express';
import {auth} from '../controller/index';
import {authValid} from '../validation/index';

const router = express.Router();

let initRouters = (app) => {

  router.post("/create-new-account",authValid.checkRegister,auth.createNewAccount);

  router.get("/active-account-:nameAccount-:token",auth.activeAccount);

  router.get("/request-login/:nameAccount-:password",authValid.checkLogin,auth.userLogin);

  router.get("/login", (req, res) =>{
    res.render("auth/master");
  })

  // routes.get('*', (req,res) =>{
  //   res.redirect('/login');
  // })

  return app.use("/", router);
}

module.exports = initRouters;