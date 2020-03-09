import express from 'express';
import http from 'http';
import initRouters from './routers/web';
import configViewEngine from './config/viewEngine';
import connectDB from './config/connectDB';
import bodyParser from 'body-parser';
import {configSession} from './config/configSession';

import pem from 'pem';
import https from 'https'; 

pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err
  }

  const app = express();

  const server = http.createServer(app);

  connectDB();

  // config connect-mongo and session
  configSession(app);

  // enable post data
  app.use(bodyParser.urlencoded({extended : true}));

  initRouters(app);

  configViewEngine(app);

  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, function(){
    console.log(`Start complete at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
  });
})

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
// })