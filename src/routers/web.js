import express from 'express';
import {auth} from '../controller/index';

const router = express.Router();

let initRouters = (app) => {

  router.post("/create-new-account",auth.createNewAccount);

  router.get("/login", (req, res) =>{
    res.render("auth/master");
  })

  // routes.get('*', (req,res) =>{
  //   res.redirect('/login');
  // })

  return app.use("/", router);
}

module.exports = initRouters;