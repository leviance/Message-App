import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let contactSchema = new Schema({
  contactId: String,
  receiverId: String, 
  active: {type: Boolean , default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  removedAt: {type: Number, default: null}
})

contactSchema.statics = {

}

module.exports =  mongoose.model("Contacts",contactSchema)