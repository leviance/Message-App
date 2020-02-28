import userModel from '../models/userModel';
import {loginRegisterIncorrect} from '../../lang/vi';
import bcrypt from 'bcrypt';
import uid from 'uid';

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
      
      data.local.veryfyToken =  uid(10);
      
      let result = await userModel.createNew(data);

      if(result){
        return resolve(true);
      }

  });
};

module.exports = {
  createNewUser: createNewUser
}
