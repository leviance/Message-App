/**
 *  data được dùng trong tất cả các socket emit lên server !
 *  gồm 4 tham số 
 *  data = {
 *    senderId : 
 *    receiverId :
 *    username : 
 *    avatar ; 
 * }
 *  
 */
let validUserId = (userId) =>{
  return new Promise((resolve, reject) => {
      let isID = new RegExp(/^[0-9a-zA-Z]+$/);

      if(!isID.test(userId)){
        return reject();
      }

      return resolve();
  })
}

let validAvatar = (avatar) => {
  return new Promise((resolve, reject) => {
    let isLinkImage = new RegExp(/(.jpg|.png|.jpeg)$/);

      if(!isLinkImage.test(avatar)){
        return reject();
      }

      return resolve();
  })
}

let validUserName = (username) => {
  return new Promise((resolve, reject) => {
    let isUserName = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);
  
    if(!isUserName.test(username)){
      return reject();
    }

    return resolve();
  })
}

module.exports = {
  validUserId: validUserId,
  validAvatar: validAvatar,
  validUserName: validUserName
}
