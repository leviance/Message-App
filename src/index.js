import express from 'express';
import http from 'http';
import initRouters from './routers/web';
import configViewEngine from './config/viewEngine';
import connectDB from './config/connectDB';
import bodyParser from 'body-parser';
import {configSession} from './config/configSession';

const app = express();

const server = http.createServer(app);

connectDB();

// config connect-mongo and session
configSession(app);

// enable post data
app.use(bodyParser.urlencoded({extended : true}));

initRouters(app);

configViewEngine(app);

server.listen(process.env.APP_PORT, function(){
  console.log(`Start complete at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
})