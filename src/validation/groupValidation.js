import {groupValid} from '../../lang/vi';

let validDataToCreateGroup = (listUserIdToCreateGroup,groupName,description) => {
  return new Promise((resolve, reject) => {
    if(listUserIdToCreateGroup.length < 3) return reject(groupValid.userAmountIsCorrect);
   
    let regex = new RegExp(/^[A-Z0-9a-z]+$/);
    listUserIdToCreateGroup.forEach( userId => {
      if(!regex.test(userId)) return reject(groupValid.idIsCorrect);
    })

    if(groupName.length < 6 || groupName.length > 45) return reject(groupValid.groupNameIsCorrect);

    if(description.length < 6 || description.length > 100) return reject(groupValid.descriptionIsCorrect);
    
    let regexName = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);
   
    if(!regexName.test(groupName)) return reject(groupValid.groupNameIsCorrect);
    if(!regexName.test(description)) return reject(groupValid.descriptionIsCorrect);
    
    return resolve();

  })
}

module.exports = {
  validDataToCreateGroup: validDataToCreateGroup
}