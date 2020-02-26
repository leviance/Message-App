import express from 'express';
import http from 'http';
import initRouters from './routers/web';
import configViewEngine from './config/viewEngine';

const app = express();

const server = http.createServer(app);

initRouters(app);

configViewEngine(app);

server.listen(process.env.APP_PORT, function(){
  console.log(`Start complete at ${process.env.APP_HOST}:${process.env.APP_PORT}`);
})