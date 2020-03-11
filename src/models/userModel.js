import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let userSchema = new Schema({
  nameAccount: String,
  username: {type: String, index: true},
  avatar: {type: String, default: "avatarDefault.jpg"},
  phoneNumber: {type: String, default: null}, 
  images: Array,
  address: {type: String, default: null},
  class: {type: String, default: null},
  linkSocial: Object,
  gender: {type: String, default: "Male"},
  local: {
    email: {type: String, trim: true},
    password: String,
    isActive: {type: Boolean , default: false},
    veryfyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: String
  },
  google: {
    uid: String,
    token: String,
    email: String
  },
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  removedAt: {type: Number, default: null}

});

userSchema.statics = {
  createNew(item){
    return this.create(item);
  }, 
  findByEmail(email){
    return this.findOne({"local.email": email}).exec();
  }, 
  findNameAccount(nameAccount){
    return this.findOne({"nameAccount": nameAccount}).exec();
  }, 
  activeAccount(nameAccount,token){
    return this.updateOne({$and:[
      {"nameAccount":nameAccount},
      {"local.veryfyToken":token}
    ]},{"local.veryfyToken": null,"local.isActive": true}).exec();
  },
  userLogin(nameAccount){
    return this.findOne({
      $and:[
        {"nameAccount":nameAccount},
        {"local.isActive": true},
        {"removedAt": null}
      ]
    }).exec();
  },
  searchFriends(userName,regex,limit){
    return this.find({ 
        $and: [
          {$text: { $search: userName  }},
          {"local.isActive": true}
        ]
  },{_id: 1, avatar: 1, username: 1, class: 1,score: { $meta: "textScore" } }).sort( { score: { $meta: "textScore" } } ).limit(limit).exec();
  },
  updateUserInfor(userId,inforToUpdate){
    return this.updateOne({"_id": userId},inforToUpdate).exec();
  },
  inforUser(userId){
    return this.findOne({"_id": userId},{"local.password": 0, "local.isActive": 0, "local.veryfyToken": 0, "facebook.token": 0, "google.token": 0}).exec();
  },
  findByFaceBookId(uid){
    return this.findOne({"facebook.uid": uid}).exec();
  },
  findByGoogleId(uid){
    return this.findOne({"google.uid": uid}).exec();
  }
}

module.exports = mongoose.model("Users", userSchema);
