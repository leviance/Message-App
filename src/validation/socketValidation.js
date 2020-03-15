let acceptContactValid = (data) => {
  return new Promise((resolve, reject) => {
    let isID = new RegExp(/^[0-9a-zA-Z]+$/);
    let isLinkImage = new RegExp(/^(image\/).+(.jpg|.png|.jpeg)$/);
    let isUserName = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);

    if(!isID.test(data.receiverId) || !isID.test(data.senderId) ){
      return reject();
    }
    
    if(!isLinkImage.test(data.avatar)){
      return reject();
    }
    
    if(!isUserName.test(data.username)){
      return reject();
    }

    return resolve();
    
  })
}

module.exports = {
  acceptContactValid: acceptContactValid
}