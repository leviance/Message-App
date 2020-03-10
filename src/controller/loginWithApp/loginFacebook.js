import passport from "passport";
import strategy from "passport-facebook";
import UserModel from "../../models/userModel";

const FacebookStrategy = strategy.Strategy;

let initPassportFacebook = () => {
  passport.serializeUser(function(user, done) {

    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'email']
      },
      async function(accessToken, refreshToken, profile, done) {
        // check account exist or not
        let checkUser = await UserModel.findByFaceBookId(profile.id);
       
        if(checkUser === null) {
          let dataToCreateUser = {
            username: profile._json.name,
            local: {
              isActive : true,
              veryfyToken: null
            },
            facebook: {
              uid: profile._json.id,
              email: profile._json.email
            }
          }

          let createUser = await UserModel.createNew(dataToCreateUser); 
        }

        checkUser = await UserModel.findByFaceBookId(profile.id);
        // save session
        let userSession = {
          userId: checkUser._id
        }
        

        done(null, userSession);
      }
    )
  );
}

module.exports = initPassportFacebook;