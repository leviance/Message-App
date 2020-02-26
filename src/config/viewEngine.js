import express from 'express';
import ejsExtend from 'express-ejs-extend';

let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.engine("ejs",ejsExtend);
  app.set("view engine", "ejs");
  app.set("views","./src/views");
};

module.exports = configViewEngine;
