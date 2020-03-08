import {home} from '../services/index';
import _ from 'lodash';
import multer  from 'multer';
import uid  from 'uid';
import {app} from "../config/app";
import {transUpdateUserInfo, transValidation} from "../../lang/vi";
import regularExpressions from '../regularExpressions/index';

const LIMIT_FRIENDS_TEKEN = 10;

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/image/userImages')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + uid(4) + '-' + file.originalname)
  }
})
 
let upload = multer({ 
  storage: storage , 
  fileFilter: function (req, file, callback) {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1048576
  }
}).single("avatar");


let searchFriends = async (req,res) => {
  let userName = req.body.userName;

  try {
    let searchResults = await home.searchFriends(userName,LIMIT_FRIENDS_TEKEN);

    return res.status(200).send(searchResults);
  } catch (error) {
    return res.status(500).send(error);
  }
}

let userLogOut = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
}

let updateUserInfor = (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      return res.status(500).send(transUpdateUserInfo.errorUpdateAvatar);
    }

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

    if(Object.keys(inforToUpdate).length === 0 && !req.file){
      return res.status(500).send(transUpdateUserInfo.dataToUpdateEmpty);
    }


    try {
      
      res.status(200).send(transUpdateUserInfo.updateSuccess);
    } catch (error) {
      
    }
    
  })
  
}



module.exports = {
  searchFriends: searchFriends,
  userLogOut: userLogOut,
  updateUserInfor: updateUserInfor
};

