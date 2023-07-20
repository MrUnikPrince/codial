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