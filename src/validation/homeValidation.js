import regularExpressions from '../regularExpressions/index';
import {transUpdateUserInfo, transValidation} from "../../lang/vi";

let validUserUpdateInfor = (req,res) => {
  return new Promise( async (resolve, reject) => {
    let inforToUpdate = {};

    // validation username
    if(req.body.username){
      let regex = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);
      
      if(!regex.test(req.body.username)){
        return res.status(500).send(transValidation.usernameIncorrect);
      }

      // loại bỏ khoảng trắng thừa
      let edditUserName = await regularExpressions.removeExtraWhitespace(req.body.username);

      if(edditUserName.length < 6 || edditUserName.length > 30){
        return res.status(500).send(transValidation.usernameLengthIncorrect);
      }

      if(edditUserName !== ""){
        inforToUpdate.username = edditUserName;
      }
    }

    if(req.body.address){
      let regex = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);
      
      if(!regex.test(req.body.address)){
        return res.status(500).send(transUpdateUserInfo.addressIncorrect);
      }

      // loại bỏ khoảng trắng thừa
      let edditAddress = await regularExpressions.removeExtraWhitespace(req.body.address);

      if(edditAddress.length < 6 || edditAddress.length > 50){
        return res.status(500).send(transUpdateUserInfo.addressLengthIncorrect);
      }

      if(edditAddress !== ""){
        inforToUpdate.address = edditAddress;
      }
    }

    if(req.body.phoneNumber){
      let regex = new RegExp(/^[0-9]+$/);
      
      if(!regex.test(req.body.phoneNumber)){
        return res.status(500).send(transUpdateUserInfo.phoneNumberIncorrect);
      }

      if(req.body.phoneNumber.length !== 10){
        return res.status(500).send(transUpdateUserInfo.phoneNumberIncorrect);
      }

      inforToUpdate.phoneNumber = req.body.phoneNumber
    }

    if(req.body.class){
      let regex = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);
      
      if(!regex.test(req.body.class)){
        return res.status(500).send(transUpdateUserInfo.classIncorrect);
      }

      // loại bỏ khoảng trắng thừa
      let edditClass = await regularExpressions.removeExtraWhitespace(req.body.class);

      if(edditClass.length < 6 || edditClass.length > 30){
        return res.status(500).send(transUpdateUserInfo.classIncorrect);
      }

      if(edditClass !== ""){
        inforToUpdate.class = edditClass;
      }
    }

    return resolve(inforToUpdate);
  })
  
}

module.exports = {
  validUserUpdateInfor: validUserUpdateInfor
}