const passport=require('passport')
const GoogleStrategy= require('passport-google-oauth20').Strategy
const GithubStrategy= require('passport-github2').Strategy 
const User=require('../model/User')

// google
passport.use(new GoogleStrategy({
  clientID: "1084805314648-iidnjt0lqi2ivn0e1cvmqpo66ba9ucan.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "https://shop-oyck.onrender.com/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
   // cb(undefined,profile)
   console.log("profile",profile);
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
// github
passport.use(new GithubStrategy({
  clientID: "8cbb53140120b4bd80be",
  clientSecret: "09d902b17621ca490bab0e057f115518fcbd2d58",
  callbackURL: "https://shop-oyck.onrender.com/auth/github/callback",
  scope: ["user:email"]
  },
  function (accessToken, refreshToken, profile, done) {
   // done(undefined,profile)
    if(profile.id){
      User.findOne({email:profile.email})
      .then((user)=>{
         if(user){
          done(null,user)
         }else{
          new User({
            name: profile.displayName,
            email: profile.email,
            imageUrl: profile.photos[0].value,
          }).save()
          .then(user => done(null, user));
         }
    }
  )
  }
}));
passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})
