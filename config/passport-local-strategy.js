const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log('Invalid Username or Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log(`Error in finding user --> passport ${err}`);
      return done(err);
    }
  }));
  

// serializing the user to decide which key is to be kept in the cokkie
passport.serializeUser((user,done) => {
    done(null, user.id);
});

// deserializing the from the key in the cookies 

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        console.log(`Error in finding user --> Passport`);
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log(`Error in finding user --> Passport`);
      return done(err);
    }
  });
  

// check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // if user is signed in, then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()){
        // req.user contains the current sifned in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;