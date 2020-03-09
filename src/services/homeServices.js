import userModel from '../models/userModel';
import regularExpressions from '../regularExpressions/index';

let searchFriends = (userName,limit) => {
  return new Promise( async (resolve, reject) => {
    // regular expression for search friends 
    let regex = regularExpressions.regexSearchFriends(userName);

    searchFriends = await userModel.searchFriends(userName,regex,limit);

    if(searchFriends.length === 0) {
      return reject(searchFriends);
    }
    return resolve(searchFriends);
  })
}

let updateUserInfor = async (userId,inforToUpdate) =>{
  return new Promise( async (resolve, reject) => {
    let result = await userModel.updateUserInfor(userId,inforToUpdate);
    return resolve(result);
  })
}

module.exports = {
  searchFriends: searchFriends,
  updateUserInfor: updateUserInfor
}