import express from 'express';

const router = express.Router();

let initRouters = (app) => {

  

  router.get('/', (req, res) =>{
    res.render("auth/master");
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