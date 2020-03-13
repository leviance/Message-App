import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';

const saltRounds = 12;

let updateUserInfor = async (userId,inforToUpdate) =>{
  return new Promise( async (resolve, reject) => {
    let result = await UserModel.updateUserInfor(userId,inforToUpdate);
    return resolve(result);
  })
}

let updateUserPassword = async (userId,newPassword) =>{
  return new Promise( async (resolve, reject) =>{
    // hash password
    let hash = await bcrypt.hash(newPassword, saltRounds)
    let dataToUpdate = {
      local : {
        password: hash,
        isActive: true,
        veryfyToken: null
      }
    }

    await UserModel.updateData(userId,dataToUpdate);
    
    return resolve();

  })
}

let getUserInformation = (userId) => {
  return new Promise( async (resolve, reject) =>{
    let userInfo = await UserModel.inforUser(userId);

    return resolve(userInfo);
  });

}

module.exports = {
  updateUserInfor: updateUserInfor,
  updateUserPassword: updateUserPassword,
  getUserInformation: getUserInformation
}