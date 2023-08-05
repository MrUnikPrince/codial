const User = require('../models/user');
module.exports.profile = async (req,res) => {
    const user = await User.findById(req.params.id);
    return res.render('user_profile', {
        title:'User Profile',
        profile_user: user
    });
}

//  update user
module.exports.update = async (req, res) => {
    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        }
    }catch(err){
        return res.status(401).send('Unauthorized');
    }
}
// sign up controller 
module.exports.signUP = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');  
    }
    return res.render('user_sign_up',{
        title: "Codial | sign Up"
    });
}
// log-in controller
module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codial | sign in"
    });
}

// get the sign up data
module.exports.create = async (req, res) => {
    // check Password is match
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Password not matches');
        return res.redirect('back');
    }
    console.log(req.body);
    //// Check if the user is present in the database 
    const newUser = await User.findOne({ email: req.body.email,});
    try{
        if (!newUser) {
            // If user is not present, create the user account
            await User.create(req.body);
            return res.redirect('/users/sign-in'); 
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error in creating user ${err}`);
        return res.redirect('back');

    }

}

// sign in and create a session for user
module.exports.createSession = (req,res) => {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

// sign out

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log('Error in logging out:', err);
        return res.redirect('/');
      }
      req.flash('success', 'You have logged out!');
      return res.redirect('/');
    });
  };
  