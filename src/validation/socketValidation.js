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
let acceptContactValid = (data) => {
  return new Promise((resolve, reject) => {
    let isID = new RegExp(/^[0-9a-zA-Z]+$/);
    let isLinkImage = new RegExp(/^(image\/).+(.jpg|.png|.jpeg)$/);
    let isUserName = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);

    if(data.receiverId && data.senderId){
      if(!isID.test(data.receiverId) || !isID.test(data.senderId) ){
        return reject();
      }
    }
    
    if(data.avatar){
      if(!isLinkImage.test(data.avatar)){
        return reject();
      }
    }
    
    if(data.username){
      if(!isUserName.test(data.username)){
        return reject();
      }
    }
    
    return resolve();
    
  })
}

module.exports = {
  acceptContactValid: acceptContactValid
}