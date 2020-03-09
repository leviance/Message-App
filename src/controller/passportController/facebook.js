import passport from 'passport';
import passportFacebook from 'passport-facebook';
import UserModel from '../../models/userModel';


let FacebookStratagy = passportFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbAppCallbackUrl = process.env.FB_CALLBACK_URL;

let initPassportFacebook = () => {
  passport.use(new FacebookStratagy({
    clientID: fbAppId, 
    clientSecret : fbAppSecret,
    callbackURL : fbAppCallbackUrl,
    passReqToCallback: true,
    profileFields: ["email", "gender","displayName"]
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserModel.findByFacebookUid(profile.id);
      if(user) {
        return done(null, user);
      }

      console.log(profile)

      let newUserItem = {
        username: profile.displayName,
        gender: profile.gender,
        local: {isActive: true},
        facebook: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value
        }
      };

      let newUser = UserModel.createNew(newUserItem);
      return done(null, newUser);

    } catch (error) {
      console.log(error);
      return done(null,false);
    }
  }));

  passport.serializeUser( (user, done) => {
    req.session.user = user._id;
    console.log("passport : " + req.session.user)
    done(null,user._id);
  });

  passport.deserializeUser( (id, done) => {
    UserModel.findUserById(id)
      .then((user) => {
        return done(null,user);
      })
      .catch((err) => {
        return done(err, null);
      });
  });
  
};

module.exports = initPassportFacebook;