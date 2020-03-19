import multer  from 'multer';
import uid  from 'uid';
import {app} from "../config/app";
import {user} from "../services/index";
import {homeValid} from "../validation/index";
import {transUpdateUserInfo,transValidation} from "../../lang/vi";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, app.avatar_directory)
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
    fileSize: app.avatar_limit_size
  }
}).single("avatar");


let updateUserInfor = (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      return res.status(500).send(transUpdateUserInfo.errorUpdateAvatar);
    }

    let inforToUpdate = await homeValid.validUserUpdateInfor(req,res);

    if(req.file){
      inforToUpdate.avatar = req.file.filename;
    }

    // check inforToUpdate ? = null 
    if(Object.keys(inforToUpdate).length === 0 && !req.file){
      return res.status(500).send(transUpdateUserInfo.dataToUpdateEmpty);
    }
    
    try {
      await user.updateUserInfor(req.session.user.userId,inforToUpdate);
      res.status(200).send(transUpdateUserInfo.updateSuccess);
    } catch (error) {
      res.status(500).send(error)
    }
    
  })
  
}

let updateUserPassword = async (req, res) =>{
  let userId = req.session.user.userId;
  let newPassword = req.body.newPassword;
  
  try {
    await homeValid.updateUserPassword(newPassword);
    await user.updateUserPassword(userId,newPassword);
    res.status(200).send(transUpdateUserInfo.updateSuccess);
  } catch (error) {
    return res.status(500).send(error);
  }
  
}

let userLogOut = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
}

let getUserInformation = async (req, res) =>{
  
  let inforUser = await user.getUserInformation(req.params.userId);

  return res.status(200).send(inforUser)
}

let searchFriendsToAddGroup = async (req, res) => {
  let keyWords = req.body.keyWords;
  let searcherId = req.session.user.userId;
  let skip = Number(req.body.skip);
  let listUserIdAdded = req.body.listIdUserAdded;

  let regex = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);     
  if(!regex.test(keyWords)){
    return res.status(500).send(transValidation.usernameIncorrect);
  }

  try {
    let userInfor = await user.searchFriendsToAddGroup(searcherId,listUserIdAdded,keyWords,skip);

    if(userInfor.length === 0) return res.status(500).send(transValidation.dataNoFound);

    return res.status(200).send(userInfor);
  } catch (error) {
    return res.status(500).send(error);
  }

}

module.exports = {
  updateUserInfor: updateUserInfor,
  updateUserPassword: updateUserPassword,
  userLogOut: userLogOut,
  getUserInformation: getUserInformation,
  searchFriendsToAddGroup: searchFriendsToAddGroup
}