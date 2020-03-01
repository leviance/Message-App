import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

let config = (app) => {
  // config session
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'drdung1999',
    resave: true,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    store: new MongoStore({ 
      url: `mongodb://${process.env.APP_HOST}/${process.env.DB_NAME}`,
      ttl: 60 * 60 * 24 // 1 day
    })
  }))
}

export const configSession = config;