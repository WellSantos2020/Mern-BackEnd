const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const userModel=require("./model/userModels")
const key = require("./keys");
const opts = {};
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;


opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});



module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
      userModel.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

module.exports=passport.use(new GoogleStrategy({
  callbackURL: "http://localhost:5000/auth/google/redirect" ,
  clientID:key.clientID,
  clientSecret: key.clientSecret,
  
},

function(accessToken, refreshToken, profile,email,done) {
   userModel.findOne({ email:email.emails[0].value } )
   .then(currentuser=>{
     if(currentuser){
       console.log(currentuser)
       currentuser.save().then(res => done(null, res));
      
     }else {
      
      user=new userModel({
        email:email.emails[0].value,
        name:email.displayName,
        image:email.photos[0].value,
        goath:true,
        loggedin: true
    }) 
        console.log(user)
    user.save().then(newUser => {
      done(null, newUser);
    });

   
     }
    });
})
);



opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;


