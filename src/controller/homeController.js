import {home} from '../services/index';
import multer  from 'multer';
import uid  from 'uid';
import {app} from "../config/app";
import {transUpdateUserInfo} from "../../lang/vi";
import {homeValid} from "../validation/index";

const LIMIT_FRIENDS_TEKEN = 10;

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

    let inforToUpdate = await homeValid.validUserUpdateInfor(req,res);

    if(req.file){
      inforToUpdate.avatar = req.file.filename;
    }

    // check inforToUpdate ? = null 
    if(Object.keys(inforToUpdate).length === 0 && !req.file){
      return res.status(500).send(transUpdateUserInfo.dataToUpdateEmpty);
    }

    try {
      let result = await home.updateUserInfor(req.session.user.userId,inforToUpdate);
      res.status(200).send(transUpdateUserInfo.updateSuccess);
    } catch (error) {
      res.status(500).send(error)
    }
    
  })
  
}



module.exports = {
  searchFriends: searchFriends,
  userLogOut: userLogOut,
  updateUserInfor: updateUserInfor
};

