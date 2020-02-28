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

let activeAccount = (req, res) =>{
  let result = "kích hoạt tài khoản thất bại !";
  res.render('activeAccount/master',{result});
}

module.exports = {
  createNewAccount: createNewAccount,
  activeAccount: activeAccount
}