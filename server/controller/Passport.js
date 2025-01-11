const passport=require('passport')
const GoogleStrategy= require('passport-google-oauth20').Strategy
const User=require('../model/User')

// google
passport.use(new GoogleStrategy({
  clientID: "1084805314648-iidnjt0lqi2ivn0e1cvmqpo66ba9ucan.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "https://shop-oyck.onrender.com/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
   // cb(undefined,profile)
  //  console.log("profile",profile);
    if(profile.id){
      User.findOne({email:profile.emails[0].value})
      .then((user)=>{
         if(user){
            done(null, user);
         }else{
          new User({
            name: profile.name.familyName + ' ' + profile.name.givenName,
            email: profile.emails[0].value,
            imageUrl: profile.photos[0].value,
          }).save()
          .then(user => done(null, user));
         }
    }
  )
  }
}));

passport.serializeUser((user,done)=>{
    console.log("Serialized user:", user.email)
    done(null,user.email)
})

passport.deserializeUser((user,done)=>{
  console.log("Deserialized user:", user);
    done(null,user)
})
