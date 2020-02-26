import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let userSchema = new Schema({
  nameAccount: String,
  username: String,
  password: {type: String, default: "avatarDefault.jpg"},
  phoneNumber: {type: String, default: null}, 
  images: Array,
  adress: {type: String, default: null},
  class: {type: String, default: null},
  linkSocial: Object,
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
  }
}

module.exports = mongoose.model("Users", userSchema);