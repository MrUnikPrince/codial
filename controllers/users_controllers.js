const User = require('../models/user')
module.exports.profile = async (req, res) => {
    if(req.cookies.user_id){
        const user = await User.findById(req.cookies.user_id);
        if(user){
            return res.render('user_profile', {
                title: 'User Profle',
                user:user
            });
        }
        return res.redirect('/users/sign-in')
    }else{
        return res.redirect('/users/sign-in')
    }
}

// sign up controller 
module.exports.signUP = (req, res) => {
    return res.render('user_sign_up', {
        title: "Codial | sign Up"
    });
}
// log-in controller
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in', {
        title: "Codial | sign in"
    });
}

// get the sign up data
module.exports.create = async (req, res) => {
    // check Password is match
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
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
module.exports.createSession = async (req, res) => {
    try{
        const {email , password } = req.body;
        // find the user in the database by email
        const user = await User.findOne({email});

        // if user is not found or password is incorrect
        if(!user || user.password != password){
            return res.redirect('back');
        }
        // req.session.isLoggedIn = true;
        res.cookie('user_id', user._id);
        return res.redirect('/users/profile')
    }catch(err){
        console.log(`Error in creating user session ${err}`)
        return res.redirect('back');
    }
}

// user
module.exports.signOut = (req,res) => {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}