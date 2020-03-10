import {validationResult} from 'express-validator';
import {auth} from '../services/index';


let createNewAccount = async (req, res) => {
  let validationErrors = validationResult(req).errors;
  let validationMess = [];
  validationErrors.forEach(error => {
    validationMess.push(error.msg);
  });

  if(validationMess.length !== 0){
    return res.status(200).send(validationMess);
  }

  let data = {
    nameAccount: req.body.nameAccount,
    username: req.body.username,
    gender: req.body.gender,
    local: {
      email: req.body.email,
      password: req.body.password,
      veryfyToken: String
    }
  }

  try {

    let createNewUser = await auth.createNewUser(data);

    return res.status(200).send(createNewUser);

  } catch (error) {
    res.status(500).send(error);
  }

}

let activeAccount = async (req, res) =>{
  try {
    //  data = true || false
    let data = await auth.activeAccount(req.params.nameAccount,req.params.token);
    res.render('activeAccount/master',{data});
  } catch (data) {
    res.render('activeAccount/master',{data});
  }
  
}

let userLogin = async (req,res) => {
  // prevent DoS attach
  if(req.session.user || req.session.passport){
    return res.status(500).send("DoS ??");
  }

  let validationErrors = validationResult(req).errors;
  let validationMess = [];
  validationErrors.forEach(error => {
    validationMess.push(error.msg);
  });

  if(validationMess.length !== 0){
    return res.status(500).send(false);
  }

  try {
    let nameAccount = req.params.nameAccount;
    let password = req.params.password;

    // userLogin is true 
    let data = await auth.userLogin(nameAccount,password);
    
    let userSession = {
      userId: data._id
    }
    req.session.user = userSession;

    console.log(req.session.user || req.session.passport);
    
    data = true;
    return res.status(200).send(data);

  } catch (error) {
    return res.status(500).send(error);
  }
}

let checkLogedin = async (req, res) => {
  if(req.session.user || req.session.passport){
    // đặt lại session thành chuẩn chung thay cho session passport
    if(req.session.passport){
      let userSession = {
        userId: req.session.passport.user.userId
      }
      req.session.user = userSession;
    }

    let userInfo = await auth.inforUser(req.session.user.userId);

    return res.render("main/layout/home",{user : userInfo});
  }
  res.redirect("/login");
}

let checkLogedOut = (req, res) =>{
  if(req.session.user || req.session.passport){
    return res.redirect("/");
  }

  res.render("auth/master");
}

module.exports = {
  createNewAccount: createNewAccount,
  activeAccount: activeAccount,
  userLogin: userLogin,
  checkLogedin: checkLogedin,
  checkLogedOut: checkLogedOut
}

