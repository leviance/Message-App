import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

let config = (app) => {
  // config session
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'drdung1999',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge: 1000 * 60 * 60 * 24}, // 1 day
    store: new MongoStore({ 
      url: `mongodb://${process.env.APP_HOST}/${process.env.DB_NAME}`,
      autoRemove: true,
      ttl: 60 * 60 * 24, // 1 day
      clearInterval: 3600 // clear every hour
    })
  }))
}

export const configSession = config;