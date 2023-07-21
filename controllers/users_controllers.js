module.exports.profile = (req,res) => {
    return res.render('user_profile', {
        title:'User Profle'
    });
}

// sign up controller 
module.exports.signUP = (req, res) => {
    return res.render('user_sign_up',{
        title: "Codial | sign Up"
    });
}
// log-in controller
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in',{
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
module.exports.createSession = (req,res) => {

}