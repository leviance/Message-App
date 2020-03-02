import userModel from '../models/userModel';

let searchFriends = (userName) => {
  return new Promise( async (resolve, reject) => {
    try {
      let searchFriends = await userModel.searchFriends(userName);
      console.log(searchFriends);
      return resolve(searchFriends);
    } catch (error) {
      return reject(error);
    }
  })
  
}

module.exports = searchFriends;