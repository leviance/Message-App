import mongoose from 'mongoose';
import bluebird from 'bluebird';

let connectDB = () =>{
  mongoose.Promise = bluebird;

  const URL = `mongodb://${process.env.APP_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  console.log(URL);
  return mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = connectDB