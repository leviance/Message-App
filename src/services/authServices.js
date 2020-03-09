import userModel from '../models/userModel';
import {loginRegisterIncorrect} from '../../lang/vi';
import bcrypt from 'bcrypt';
import uid from 'uid';
import {sendMail} from '../config/nodeMailer';

const saltRounds = 12;

let createNewUser = (data) => {
  return new Promise( async (resolve, reject) => {
    

      let findEmailRegister = await userModel.findByEmail(data.local.email);
      let findNameAccount = await userModel.findNameAccount(data.nameAccount);

      if(findNameAccount !== null) {
        return reject(loginRegisterIncorrect.nameAccountExists);
      }

      if(findEmailRegister !== null){
        return reject(loginRegisterIncorrect.emailExists);
      }

      // hash password before save in DB
      data.local.password = bcrypt.hashSync(data.local.password, saltRounds);
      
      // create verify token
      data.local.veryfyToken =  uid(10);

      // send mail verify
      let linkVerify = `${process.env.NODEMAILER_HOST}-${data.nameAccount}-${data.local.veryfyToken}`;
      let resultSendmail = await sendMail(data.local.email,linkVerify);
      if(resultSendmail === false){
        return reject(loginRegisterIncorrect.sendMailIncorrect);
      }

      
      let result = await userModel.createNew(data);

      if(result){
        return resolve(true);
      }

  });
};

let activeAccount = (nameAccount,token) => {
  return new Promise( async (resolve, reject) => {
    let activeAccount = await userModel.activeAccount(nameAccount,token);
    if(activeAccount.nModified == 1){
      return resolve(true);
    }
    return reject(false);
  })
}

let userLogin = (nameAccount,password) =>{
  return new Promise( async (resolve, reject) =>{
    let result = await userModel.userLogin(nameAccount);

    // account is not active 
    if(result === null){ return reject(loginRegisterIncorrect.accountIsNotActive);}

    // resultCompare is true || false
    let resultCompare =  bcrypt.compareSync(password, result.local.password);

    if(resultCompare){
      return resolve(result);
    }
    
    return reject(resultCompare);
  });
}

let inforUser = (userId) =>{
  return new Promise( async (resolve, reject) => {
    let userInfo = await userModel.inforUser(userId);
    return resolve(userInfo);
  })
}

module.exports = {
  createNewUser: createNewUser,
  activeAccount: activeAccount,
  userLogin: userLogin,
  inforUser: inforUser
}
