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
  let validationErrors = validationResult(req).errors;
  let validationMess = [];
  validationErrors.forEach(error => {
    validationMess.push(error.msg);
  });

  if(validationMess.length !== 0){
    return res.status(500).send();
  }

  try {
    let nameAccount = req.params.nameAccount;
    let password = req.params.password;

    // userLogin is true 
    let data = await auth.userLogin(nameAccount,password);
    
    return res.status(200).send(data);

  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  createNewAccount: createNewAccount,
  activeAccount: activeAccount,
  userLogin: userLogin
}