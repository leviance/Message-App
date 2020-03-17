import express from 'express';
import http from 'http';
import initRouters from './routers/web';
import configViewEngine from './config/viewEngine';
import connectDB from './config/connectDB';
import bodyParser from 'body-parser';
import {configSession} from './config/configSession';
import passport from 'passport';
import socketIo from 'socket.io';
import initSocket from './socket/index';

import pem from 'pem';
import https from 'https';

// const app = express();

// const server = http.createServer(app);

// connectDB();

// // config connect-mongo and session
// configSession(app);

// // enable post data
// app.use(bodyParser.urlencoded({extended : true}));

// initRouters(app);

// configViewEngine(app);

// server.listen(process.env.APP_PORT, function(){
//   console.log(`Start complete at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
// });


pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err
  }
 
  const app = express();

  const server = https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app);

  const io = socketIo(server);
  initSocket(io);

  connectDB();

  // config connect-mongo and session
  configSession(app);

  app.use(passport.initialize());

  // enable post data
  app.use(bodyParser.urlencoded({extended : true}));

  initRouters(app);

  configViewEngine(app);
  
 
  server.listen(process.env.APP_PORT, function(){
    console.log(`Start complete at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
  });
});


  