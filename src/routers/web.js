import express from 'express';
import userModel from '../models/userModel';

const router = express.Router();

let initRouters = (app) => {

  router.get('/', (req, res) =>{
    res.render("auth/master");
    let item = {
      username: "duong hoang dung",
      images: ["1.jpg","2.jpg"]
    }
    userModel.createNew(item);
  })

  router.get("/login", (req, res) =>{
    res.render("main/layout/home");
  })

  // routes.get('*', (req,res) =>{
  //   res.redirect('/login');
  // })

  return app.use("/", router);
}

module.exports = initRouters;