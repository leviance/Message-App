import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let groupSchema = new Schema({
  userCreated : String,
  userAmount : Number,
  messageAmount : { type: Number, default: 0}, 
  members: [
    {userId: String}
  ],
  createdAt : { type: Number, default: Date.now},
  removedAt: { type: Number, default: null},
  updatedAt: { type: Number, default: null} 
});

groupSchema.statics = {

}

module.exports = mongoose.model("Groups",groupSchema);